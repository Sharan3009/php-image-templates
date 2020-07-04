<?php
    if ($_SERVER['REQUEST_METHOD']==='GET') {
        getTemplates($_GET);
    };

    function getTemplates($obj) {
        $page = $obj['page'] ?? 1;
        $count = $obj['count'] ?? 10;
        $filePath = __DIR__ . "/../assets/json/templates.json";
        if(file_exists($filePath)){
            $file = file_get_contents($filePath);
            $json = new StdClass;
            $json->page = $page;
            $json->count = $count;
            $data = json_decode($file);
            $filtered_data = array_filter($data,function($o) use ($obj){
                if($o->themeType === $obj['themeType']){
                    return true;
                }
                return false;
            });
            $startingPage = ($page - 1)*$count;
            if($startingPage>=0){
                $filtered_data = array_slice($filtered_data,$startingPage,$count);
            };
            $json->data = $filtered_data;
            echo json_encode($json);
        };
    };

?>