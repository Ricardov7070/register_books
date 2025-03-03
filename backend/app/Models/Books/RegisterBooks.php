<?php

namespace App\Models\Books;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Cache;


class RegisterBooks extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes; 

    protected $table = 'register_books';

    protected $fillable = [
        'title',
        'author',
        'publisher',
        'language',
        'publication_year',
        'edition',
        'gender',
        'quantity_pages',
        'format'
    ];


    // Realiza o cadastro de um livro
    public function createBook ($request): array {

        $book = self::create([
            'title' => $request->input('title'),
            'author' => $request->input('author'),
            'publisher' => $request->input('publisher'),
            'language' => $request->input('language'),
            'publication_year' => $request->input('publication_year'),
            'edition' => $request->input('edition'),
            'gender' => $request->input('gender'),
            'quantity_pages' => $request->input('quantity_pages'),
            'format' => $request->input('format'),
        ]);
    
        return [
            'id_book' => $book->id,
            'title' => $book->title,
        ];

    }


    // Realiza a atualização cadastral de um livro selecionado
    public function updateBook ($request, $id_book): array {

        $book = self::findOrFail($id_book);

        $book->update([
            'title' => $request->input('title'),
            'author' => $request->input('author'),
            'publisher' => $request->input('publisher'),
            'language' => $request->input('language'),
            'publication_year' => $request->input('publication_year'),
            'edition' => $request->input('edition'),
            'gender' => $request->input('gender'),
            'quantity_pages' => $request->input('quantity_pages'),
            'format' => $request->input('format'),
        ]);

        return [
            'id_book' => $book->id,
            'title' => $book->title,
        ];

    }


    // Realiza a visualização de todos os livros cadastrados
    public function viewBooks (): array {

        return Cache::remember('books_list', 60, function () {

            return self::whereNull('deleted_at')
                ->select('id', 'title', 'author', 'publisher', 'language', 'publication_year',
                        'edition', 'gender', 'quantity_pages', 'format', 'created_at')
                ->get()
                ->map(function ($book): array {
                    return [
                        'id' => $book->id,
                        'title' => $book->title,
                        'author' => $book->author,
                        'publisher' => $book->publisher,
                        'language' => $book->language,
                        'publication_year' => $book->publication_year,
                        'edition' => $book->edition,
                        'gender' => $book->gender,
                        'quantity_pages' => $book->quantity_pages,
                        'format' => $book->format
                    ];
                })
                ->toArray();

        });
        
    }


    // Realiza a exclusão de um livro selecionado
    public function deleteBook ($id_book): array {

        $book = self::findOrFail($id_book);

        $bookData = [
            'id_book' => $book->id,
            'title' => $book->title,
        ];

        $book->delete();

        return $bookData;

    }


    // Realiza a validação de existência de um livro
    public function bookValidation ($request): array {
 
        return self::where('title', $request->input('title'))
            ->where('author', $request->input('author'))
            ->where('publisher', $request->input('publisher'))
            ->where('language', $request->input('language'))
            ->where('publication_year', $request->input('publication_year'))
            ->where('edition', $request->input('edition'))
            ->where('gender', $request->input('gender'))
            ->where('quantity_pages', $request->input('quantity_pages'))
            ->where('format', $request->input('format'))
            ->whereNull('deleted_at')
            ->get()
            ->toArray();

    }

}
