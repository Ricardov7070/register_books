<?php

namespace App\Http\Requests\booksManagementRequests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class registerBooksRequest extends FormRequest
{

    public function authorize (): bool {

        return true; 

    }

    
    public function rules (): array {

        return [
            'title' => 'required|string|min:100',
            'author' => 'required|string|min:100',
            'publisher' => 'required|string|min:100',
            'language' => 'required|string|min:50',
            'publication_year' => 'required|integer|min:4',
            'edition' => 'required|integer|min:15',
            'gender' => 'required|string|min:50',
            'quantity_pages' => 'required|integer|min:15',
            'format' => 'required|string|min:50',
        ];

    }

    
    public function messages (): array {

        return [
            'title.required' => 'The title field is mandatory.',
            'title.min' => 'Title must be at least 100 characters long.',
            'author.required' => 'The author field is mandatory.',
            'author.min' => 'Author must be at least 100 characters long.',
            'publisher.required' => 'The publisher field is mandatory.',
            'publisher.min' => 'Publisher must be at least 100 characters long.',
            'language.required' => 'The language field is mandatory.',
            'language.min' => 'Language must be at least 100 characters long.',
            'publication_year.required' => 'The publication_year field is mandatory.',
            'publication_year.min' => 'Publication_year must be at least 4 characters long.',
            'publication_year.integer' => 'Publication_year must be an integer.',
            'edition.required' => 'The edition field is mandatory.',
            'edition.min' => 'Edition must be at least 15 characters long.',
            'edition.integer' => 'Edition must be an integer.',
            'gender.required' => 'The gender field is mandatory.',
            'gender.min' => 'Gender must be at least 50 characters long.',
            'quantity_pages.required' => 'The quantity_pages field is mandatory.',
            'quantity_pages.min' => 'Quantity_pages must be at least 15 characters long.',
            'quantity_pages.integer' => 'Quantity_pages must be an integer.',
            'format.required' => 'The format field is mandatory.',
            'format.min' => 'Format must be at least 50 characters long.',
        ];

    }


    protected function failedValidation (Validator $validator): never {

        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ],400));

    }  

}

