<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up (): void
    {
        Schema::create('register_books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('publisher');
            $table->string('language');
            $table->string('publication_year');
            $table->integer('edition');
            $table->string('gender');
            $table->integer('quantity_pages');
            $table->string('format');
            $table->softDeletes();
            $table->timestamps();
        });
    }


    public function down (): void
    {
        Schema::dropIfExists('register_books');
    }

};
