<?php
    if ($_SERVER['REQUEST_METHOD']==='GET') {
        getTemplates($_GET);
    }

    function getTemplates($obj) {
        $file = $obj['file'] ?? null;
        if(isset($file)){
            $filePath = __DIR__ . "/../assets/json/templates/{$file}.json";
            if(file_exists($filePath)){
                echo file_get_contents($filePath);
            }
        }
    }

?>