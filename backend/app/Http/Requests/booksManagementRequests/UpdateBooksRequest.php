<?php

namespace App\Http\Requests\booksManagementRequests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateBooksRequest extends FormRequest
{
    public function authorize (): bool {

        return true;

    }


    public function rules (): array {

        return [
            'title' => 'required|string|max:100',
            'author' => 'required|string|max:100',
            'publisher' => 'required|string|max:100',
            'language' => 'required|string|max:50',
            'publication_year' => 'required|digits:4',
            'edition' => 'required|integer|min:1|max:15',
            'gender' => 'required|string|max:50',
            'quantity_pages' => 'required|integer|min:1|max:5000',
            'format' => 'required|string|max:50',
        ];

    }


    public function messages (): array {

        return [
            'title.required' => 'The title field is mandatory.',
            'title.max' => 'The title may not be greater than 100 characters.',

            'author.required' => 'The author field is mandatory.',
            'author.max' => 'The author may not be greater than 100 characters.',

            'publisher.required' => 'The publisher field is mandatory.',
            'publisher.max' => 'The publisher may not be greater than 100 characters.',

            'language.required' => 'The language field is mandatory.',
            'language.max' => 'The language may not be greater than 50 characters.',

            'publication_year.required' => 'The publication year field is mandatory.',
            'publication_year.integer' => 'The publication year must be a valid integer.',
            'publication_year.min' => 'The publication year must be at least 4.',
            'publication_year.max' => 'The publication year must be at most 4.',

            'edition.required' => 'The edition field is mandatory.',
            'edition.integer' => 'The edition must be a valid integer.',
            'edition.min' => 'The edition must be at least 1.',
            'edition.max' => 'The edition may not be greater than 15.',

            'gender.required' => 'The gender field is mandatory.',
            'gender.max' => 'The gender may not be greater than 50 characters.',

            'quantity_pages.required' => 'The quantity of pages field is mandatory.',
            'quantity_pages.integer' => 'The quantity of pages must be a valid integer.',
            'quantity_pages.min' => 'The quantity of pages must be at least 1.',
            'quantity_pages.max' => 'The quantity of pages may not be greater than 5000.',

            'format.required' => 'The format field is mandatory.',
            'format.max' => 'The format may not be greater than 50 characters.',
        ];
        
    }


    protected function failedValidation (Validator $validator): never {

        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 400));

    }

}
