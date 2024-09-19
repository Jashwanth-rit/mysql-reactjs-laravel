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


       function add(Request $req) {
        echo  $req;
        $validated = $req->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'url' => 'required|url',
            'price' => 'required|numeric',
        ]);
    
        $user = new Product;
        $user->name = $validated['name'];
        $user->discription = $validated['description'];
        $user->url = $validated['url'];
        $user->price = $validated['price'];
    
        if ($user->save()) {
            return response()->json(['success' => true, 'id' => $user->id], 200);
        } else {
            return response()->json(['success' => false, 'message' => 'Failed to save product'], 500);
        }
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
        $prod->discription = $req->description;
        $ans = $prod->save();
        return $ans;
    }
}
