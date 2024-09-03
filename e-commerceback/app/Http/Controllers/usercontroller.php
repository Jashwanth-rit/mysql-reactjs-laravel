<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\client;
use App\Models\product;
use Illuminate\Support\Facades\Hash;

class usercontroller extends Controller
{
    //
    function register(Request $req){


        $user = new client;
        $user->firstname = $req->input('firstname');
        $user->lastname = $req->input('lastname');
       
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->save();
        return $user;
    }
    function login(Request $req){
       return client::where('email',$req->email)->first();
       }


    function add(Request $req){
        $user = new product;
        $user->name = $req->input('name');
        $user->discription = $req->input('discription');
       
        $user->url = $req->input('url');
        $user->price = $req->input('price');
        $user->save();
        return $user;

    }
    function products(){
        return product::all();
    }

    function delete(Request $req){
        $product = product::where('name', $req->name)->first();
        if ($product) {
            $product->delete();
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
        }
    }
    
    function search(Request $req){
        return product::where('name','like',"%$req->name%")->get();
    }
    function getupdate($id) {
        $ans = product::where("id", $id)->first();
        return response()->json($ans);
    }
    
    function putupdate(Request $req,$id){
        $prod = product::find($id);
        $prod->id = $req->id;
        $prod->name = $req->name;
        $prod->price = $req->price;
        $prod->url = $req->url;
        $prod->discription = $req->discription;
        $ans = $prod->save();
        return $ans;
    }
}
