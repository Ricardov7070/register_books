<?php

namespace Tests\Unit\Books;

use Tests\TestCase;
use App\Models\Books\RegisterBooks;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BookTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    // Testa a função createBook()
    public function creates_a_book_successfully () {

        $request = new Request([
            'title' => 'O Senhor dos Anéis',
            'author' => 'J.R.R. Tolkien',
            'publisher' => 'HarperCollins',
            'language' => 'Português',
            'publication_year' => 1954,
            'edition' => 1,
            'gender' => 'Fantasia',
            'quantity_pages' => 1200,
            'format' => 'Capa Dura',
        ]);

        $bookModel = new RegisterBooks();

        $response = $bookModel->createBook($request);

        $this->assertArrayHasKey('id_book', $response);
        $this->assertEquals('O Senhor dos Anéis', $response['title']);

        $this->assertDatabaseHas('register_books', [
            'title' => 'O Senhor dos Anéis',
            'author' => 'J.R.R. Tolkien',
        ]);

    }


    /** @test */
    // Testa a função updateBook()
    public function updates_a_book_successfully () {

        $book = RegisterBooks::factory()->create([
            'title' => 'O Hobbit',
            'author' => 'J.R.R. Tolkien',
            'publisher' => 'HarperCollins',
            'language' => 'Português',
            'publication_year' => 1937,
            'edition' => 1,
            'gender' => 'Fantasia',
            'quantity_pages' => 310,
            'format' => 'Capa Dura',
        ]);


        $request = new Request([
            'title' => 'O Senhor dos Anéis',
            'author' => 'J.R.R. Tolkien',
            'publisher' => 'Martins Fontes',
            'language' => 'Português',
            'publication_year' => 1954,
            'edition' => 2,
            'gender' => 'Fantasia',
            'quantity_pages' => 1200,
            'format' => 'Capa Comum',
        ]);

        $bookModel = new RegisterBooks();

        $response = $bookModel->updateBook($request, $book->id);

        $this->assertArrayHasKey('id_book', $response);
        $this->assertEquals('O Senhor dos Anéis', $response['title']);

        $this->assertDatabaseHas('register_books', [
            'id' => $book->id,
            'title' => 'O Senhor dos Anéis',
            'author' => 'J.R.R. Tolkien',
            'publisher' => 'Martins Fontes',
            'language' => 'Português',
            'publication_year' => 1954,
            'edition' => 2,
            'gender' => 'Fantasia',
            'quantity_pages' => 1200,
            'format' => 'Capa Comum',
        ]);

    }


    /** @test */
    // Testa a função viewBooks()
    public function returns_all_books_correctly () {

        Cache::forget('books_list');

        $book1 = RegisterBooks::factory()->create([
            'title' => 'O Senhor dos Anéis',
            'author' => 'J.R.R. Tolkien',
            'publisher' => 'HarperCollins',
            'language' => 'Português',
            'publication_year' => 1954,
            'edition' => 1,
            'gender' => 'Fantasia',
            'quantity_pages' => 1200,
            'format' => 'Capa Dura',
        ]);

        $book2 = RegisterBooks::factory()->create([
            'title' => '1984',
            'author' => 'George Orwell',
            'publisher' => 'Companhia das Letras',
            'language' => 'Português',
            'publication_year' => 1949,
            'edition' => 1,
            'gender' => 'Ficção Científica',
            'quantity_pages' => 328,
            'format' => 'Brochura',
        ]);

        $bookModel = new RegisterBooks();

        $response = $bookModel->viewBooks();

        $this->assertCount(2, $response);
        $this->assertEquals('O Senhor dos Anéis', $response[0]['title']);
        $this->assertEquals('1984', $response[1]['title']);

        $this->assertTrue(Cache::has('books_list'));

        $cachedBooks = Cache::get('books_list');
        $this->assertEquals($response, $cachedBooks);

    }


    /** @test */
    // Testa a função deleteBook()
    public function deletes_a_book_successfully () {

        $book = RegisterBooks::factory()->create([
            'title' => 'O Senhor dos Anéis',
            'author' => 'J.R.R. Tolkien',
        ]);

        $bookModel = new RegisterBooks();

        $response = $bookModel->deleteBook($book->id);

        $this->assertArrayHasKey('id_book', $response);
        $this->assertEquals($book->id, $response['id_book']);
        $this->assertEquals('O Senhor dos Anéis', $response['title']);

        $this->assertSoftDeleted('register_books', ['id' => $book->id]);

        $this->assertDatabaseMissing('register_books', [
            'id' => $book->id,
            'deleted_at' => null,
        ]);

        $this->assertNotNull(RegisterBooks::withTrashed()->find($book->id));

    }


    /** @test */
    // Testa a função bookValidation()
    public function validates_existing_book () {

        $book = RegisterBooks::factory()->create([
            'title' => 'O Senhor dos Anéis',
            'author' => 'J.R.R. Tolkien',
            'publisher' => 'HarperCollins',
            'language' => 'Português',
            'publication_year' => 1954,
            'edition' => 1,
            'gender' => 'Fantasia',
            'quantity_pages' => 1200,
            'format' => 'Capa Dura',
        ]);

        $request = new Request([
            'title' => 'O Senhor dos Anéis',
            'author' => 'J.R.R. Tolkien',
            'publisher' => 'HarperCollins',
            'language' => 'Português',
            'publication_year' => 1954,
            'edition' => 1,
            'gender' => 'Fantasia',
            'quantity_pages' => 1200,
            'format' => 'Capa Dura',
        ]);

        $bookModel = new RegisterBooks();

        $response = $bookModel->bookValidation($request);

        $this->assertNotEmpty($response);
        $this->assertEquals($book->id, $response[0]['id']);
        
    }
    /** @test */
    public function does_not_return_deleted_books () {

        $book = RegisterBooks::factory()->create([
            'title' => '1984',
            'author' => 'George Orwell',
            'publisher' => 'Companhia das Letras',
            'language' => 'Português',
            'publication_year' => 1949,
            'edition' => 1,
            'gender' => 'Ficção Científica',
            'quantity_pages' => 328,
            'format' => 'Brochura',
            'deleted_at' => now(),
        ]);

        $request = new Request([
            'title' => '1984',
            'author' => 'George Orwell',
            'publisher' => 'Companhia das Letras',
            'language' => 'Português',
            'publication_year' => 1949,
            'edition' => 1,
            'gender' => 'Ficção Científica',
            'quantity_pages' => 328,
            'format' => 'Brochura',
        ]);

        $bookModel = new RegisterBooks();

        $response = $bookModel->bookValidation($request);

        $this->assertEmpty($response);
        
    }
    /** @test */
    public function returns_empty_if_book_does_not_exist () {

        $request = new Request([
            'title' => 'Livro Inexistente',
            'author' => 'Autor Desconhecido',
            'publisher' => 'Editora Fake',
            'language' => 'Inglês',
            'publication_year' => 2000,
            'edition' => 1,
            'gender' => 'Mistério',
            'quantity_pages' => 400,
            'format' => 'E-book',
        ]);

        $bookModel = new RegisterBooks();

        $response = $bookModel->bookValidation($request);

        $this->assertEmpty($response);
        
    }

}
