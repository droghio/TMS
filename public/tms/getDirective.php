<?php

    if ($_SERVER["REQUEST_METHOD"] == "GET"){
        $id = $_GET["id"];
        
        if (!file_exists("/Library/WebServer/Documents/directives/".$id)){
            $file = fopen("/Library/WebServer/Documents/directives/".$id, "w");
            fwrite($file, "sleep(2)");
            fclose($file);
        }
        
        $file = fopen("/Library/WebServer/Documents/directives/".$id, "r");
        echo fread($file, filesize("/Library/WebServer/Documents/directives/".$id));
        fclose($file);
    }

?>