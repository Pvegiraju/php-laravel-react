<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Product::where('user_id', $request->user()->id)->orderBy('created_at')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'image' => '',
        ]);

        $product = $request->user()->products()->create($fields);

        return ['product' => $product, 'user' => $product->user];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Product::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'image' => '',
        ]);

        $product = Product::findOrFail($id);
        $product->update($fields);

        return ['product' => $product, 'user' => $product->user];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return ['message' => 'The product was deleted'];
    }
}
