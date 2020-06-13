<?php
    if ($_SERVER['REQUEST_METHOD']==='GET') {
        getTags($_GET);
    }

    function getTags($obj) {
        $page = $obj['page'] ?? 1;
        $file = __DIR__ . "/../assets/json/tags/{$page}.json";
        if(file_exists($file)){
            echo file_get_contents($file);
        }
    }

?>