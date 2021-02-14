<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Standard SEO -->
    <title>{{ $title }}</title>
    <meta name="robots" content="index">
    <meta name="description" content="{{ $description }}">
    <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />

    <!-- Facebook OpenGraph -->
    <meta property="fb:app_id" content=""/>
    <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url('') }}">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:site_name" content="Cura">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="">
    <meta name="twitter:site" content="">
    <meta name="twitter:title" content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}" defer></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <style>
    @import url(https://fonts.googleapis.com/css?family=Poppins);
    body {
        font-family: "Nunito Sans", Arial, Helvetica, sans-serif;
    }
    </style>
</head>
<body>
<div id="app">
    <index></index>
</div>
</body>
</html>
