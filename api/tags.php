<?php
    if ($_SERVER['REQUEST_METHOD']==='GET') {
        getTags($_GET);
    };

    function getTags($obj) {
        $page = $obj['page'] ?? 1;
        $count = $obj['count'] ?? 10;
        $filePath = __DIR__ . "/../assets/json/tags.json";
        if(file_exists($filePath)){
            $file = file_get_contents($filePath);
            $json = new StdClass;
            $json->page = $page;
            $json->count = $count;
            $data = [];
            $startingPage = ($page - 1)*$count;
            if($startingPage>=0){
                $data = array_slice(json_decode($file,true),$startingPage,$count);
            }
            $json->data = $data;
            echo json_encode($json);
        };
    };

?>