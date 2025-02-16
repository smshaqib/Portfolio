<?php
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="data.csv"');
readfile('data.csv');
?>
