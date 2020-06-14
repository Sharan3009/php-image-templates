<?php
    if ($_SERVER['REQUEST_METHOD']==='GET') {
        getTemplates($_GET);
    };

    function getTemplates($obj) {
        $page = $obj['page'] ?? 1;
        $count = $obj['count'] ?? 10;
        $filePath = __DIR__ . "/../assets/json/templates.json";
        if(file_exists($filePath)){
            $json = new StdClass;
            $json->page = $page;
            $json->count = $count;
            // echo file_get_contents($filePath);
            echo json_encode($json);
        };
    };

?>