<?php

namespace Database\Factories\Books;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Books\RegisterBooks;

/**
 * @extends Factory<RegisterBooks>
 */
class RegisterBooksFactory extends Factory
{
    protected $model = RegisterBooks::class;

    public function definition (): array {

        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name(),
            'publisher' => $this->faker->company(),
            'language' => 'Português',
            'publication_year' => $this->faker->year(),
            'edition' => $this->faker->numberBetween(1, 10),
            'gender' => 'Fantasia',
            'quantity_pages' => $this->faker->numberBetween(100, 1000),
            'format' => 'Capa Dura',
        ];

    }

}
