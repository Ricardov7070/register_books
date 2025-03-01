<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\booksManagementRequests\RegisterBooksRequest;
use App\Http\Requests\booksManagementRequests\UpdateBooksRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use App\Models\Books\RegisterBooks;


class BooksController extends Controller
{

    protected $modelBooks;


    // Método Construtor
    public function __construct (RegisterBooks $modelBooks) {

        $this->modelBooks = $modelBooks;

    }


/**
 * @OA\Post(
 *     path="/api/registerBooks",
 *     summary="Realiza o registro de um livro no banco de dados.",
 *     tags={"Gerenciamento de Livros"},
 *     @OA\Response(
 *         response=200,
 *         description="Successfully registered!"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="An error occurred, try again!"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Error in registration!"
 *     ),
 * )
 */
    public function registerBooks (RegisterBooksRequest $request): JsonResponse {

        try {

            $record = $this->validatorBooksRegistered($request);

            if ($record->getData() !== []) {
                return $record;
            }
    
            $book = $this->modelBooks->createBook($request);

            return response()->json([
                'success' => 'Successfully registered!',
                'user' => $book
            ], 200);       
    
        } catch (ValidationException $e) {
      
            return response()->json([
                'message' => 'Error in registration!',
                'errors' => $e->errors(),
            ], 400);
    
        } catch (\Throwable $th) {
        
            return response()->json([
                'error' => 'An error occurred, try again!',
            ], 500);            
    
        }    

    }


/**
 * @OA\Put(
 *     path="/api/updateBook/{id_book}",
 *     summary="Realiza a atualização de dados cadastrais de um livro registrado.",
 *     tags={"Gerenciamento de Livros"},
 *     @OA\Response(
 *         response=200,
 *         description="Updated successfully!"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="An error occurred, try again!"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Error when updating!"
 *     ),
 * )
 */
    public function updateRecord (UpdateBooksRequest $request, $id_book): JsonResponse {

        try {
           
            $record = $this->bookUpdateValidator($request, $id_book);

            if ($record->getData() !== []) {
                return $record;
            }


            $book = $this->modelBooks->updateBook($request, $id_book);

            return response()->json([
                'success' => 'Updated successfully!',
                'book' => $book
            ], 200); 

        } catch (ValidationException $e) {
      
            return response()->json([
                'message' => 'Error when updating!',
                'errors' => $e->errors(),
            ], 400);
    
        } catch (\Throwable $th) {
        
            return response()->json([
                'error' => 'An error occurred, try again!',
            ], 500);
    
        }    

    }


/**
 * @OA\Get(
 *     path="/api/viewBook",
 *     summary="Realiza a visualização de todos os livros registrados.",
 *     tags={"Gerenciamento de Livros"},
 *     @OA\Response(
 *         response=500,
 *         description="An error occurred, try again!"
 *     ),
 * )
 */
    public function viewRecord (): JsonResponse {

        try {

            $books = $this->modelBooks->viewBooks();

            return response()->json([
                'books' => $books
            ]);     
    
        } catch (\Throwable $th) {
        
            return response()->json([
                'error' => 'An error occurred, try again!',
            ], 500);
    
        }   

    }


/**
 * @OA\Delete(
 *     path="/api/deleteBook/{id_book}",
 *     summary="Realiza a exclusão de um livro selecionado do banco de dados",
 *     tags={"Gerenciamento de Livros"},
 *     @OA\Response(
 *         response=200,
 *         description="Successfully deleted!"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="An error occurred, try again!"
 *     ),
 * )
 */
    public function deleteRecord ($id_book): JsonResponse {

        try {

            $book = $this->modelBooks->deleteBook($id_book);

            return response()->json([
                'success' => 'Successfully deleted!',
                'book' => $book,
                'status' => 'Deletado.'
            ], 200);  
    
        } catch (\Throwable $th) {
        
            return response()->json([
                'error' => 'An error occurred, try again!',
            ], 500);
    
        }    

    }


    // Realiza a validação da existência dos livros já salvos no banco de dados.
    public function validatorBooksRegistered ($request): JsonResponse {

        $bookValidation = $this->modelBooks->bookValidation($request);

        if (!empty($bookValidation)) {

            return response()->json([
                'message' => 'Book already registered!',
            ], 400);
        
        }

        return response()->json([], 200);

    }


    // Realiza a validação de dados permitidos para o usuário que está atualizando as informações de um livro no banco de dados
    public function bookUpdateValidator ($request, $id_book): JsonResponse {

        $bookValidation = $this->modelBooks->bookValidation($request);

        if (!empty($bookValidation)) {

            if ($id_book != $bookValidation[0]['id']) {

                return response()->json([
                    'message' => 'There is already a book with this data registered!',
                ], 400);

            }
            
        }

    }


}
