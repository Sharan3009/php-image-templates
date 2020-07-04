<?php
    if ($_SERVER['REQUEST_METHOD']==='POST') {
        if(isset($_POST['action'])){
            switch($_POST['action']){
                case "contact-us-submit":
                submitContactUsForm($_POST);
                break;
            }
        }
    };

    function submitContactUsForm($obj){
       $contents = getQueriesFromFile();
       $user_query = $obj['form'];
       array_push($contents,$user_query);
       setQueriesInFile($contents);
       echo json_encode(NULL);
    }

    function getQueriesFromFile(){
        $filePath = __DIR__ . "/../assets/json/contact-us.json";
        $contents = file_get_contents($filePath);
        $contentsDecoded = json_decode($contents);
        return $contentsDecoded;
    }

    function setQueriesInFile($contentsDecoded){
        //Encode the array back into a JSON string.
        $json = json_encode($contentsDecoded,JSON_PRETTY_PRINT);
        $filePath = __DIR__ . "/../assets/json/contact-us.json";
        //Save the file.
        file_put_contents($filePath, $json);
    }

?>