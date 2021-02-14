<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SinglePageController extends Controller
{
    public function index(){

    	$appName = env('APP_NAME','Todo Apps');
    	$title = ucwords($appName);
    	$description = "Welcome to $title.";

    	$data = [
    		'title' => $title,
    		'description' => $description,
    	];

	    return view('app',$data);
    }
}
