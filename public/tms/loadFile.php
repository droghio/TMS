<html>

<head>
    <title>TURTLE API CONTROL</title>
</head>

<body><?php
    function saveFileData($name, $data){
        $name = preg_replace('/[^A-Za-z0-9_\-]/', '', $name);

        $revisionNum = 1;
        $filename = $name;
        //Overwrite protection.
        
        if (!file_exists("/Library/WebServer/Documents/scripts/archives/".$name)){
            mkdir("/Library/WebServer/Documents/scripts/archives/".$name);
        }
        
        while (file_exists("/Library/WebServer/Documents/scripts/archives/".$name."/".$filename)){
            $filename = $name . strval($revisionNum);
            $revisionNum = $revisionNum + 1;
        }
        
        $archivefile = fopen("/Library/WebServer/Documents/scripts/archives/".$name."/".$filename, "w");
        $file = fopen("/Library/WebServer/Documents/scripts/".$name, "w");
        $data = str_replace("\\", "", $data);
        
        $data = str_replace("==AMP==", "&", $data);
        $data = str_replace("==PLUS==", "+", $data);

        fwrite($archivefile,$data);
        fwrite($file,$data);
        fclose($file);
            
        echo "Success";
    }
        
    function test_input($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    
    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $name = test_input($_POST["name"]);
        $data = $_POST["data"];
        saveFileData($name, $data);
    }

?></body>

</html>