<?php

namespace Tests\Unit\Users;

use App\Models\Users\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use \Illuminate\Http\Request;

class UserTest extends TestCase
{

    use RefreshDatabase;

    /** @test */
    // Testa a função createUser()
    public function creates_a_user_successfully () {

        $request = new Request([
            'email' => 'user@example.com',
            'name' => 'User Test',
            'password' => 'password123'
        ]);


        $userModel = new User();
        $response = $userModel->createUser($request);

        $this->assertArrayHasKey('id_user', $response);
        $this->assertEquals('User Test', $response['name']);
        $this->assertEquals('user@example.com', $response['email']);
        $this->assertNotEmpty($response['created_at']);

        $this->assertDatabaseHas('users', [
            'email' => 'user@example.com',
            'name' => 'User Test',
        ]);

        $user = User::find($response['id_user']);
        $this->assertTrue(Hash::check('password123', $user->password));

    }


    /** @test */
    // Testa a função updateUser()
    public function updates_a_user_successfully () {

        $user = User::create([
            'email' => 'olduser@example.com',
            'name' => 'Old Name',
            'password' => Hash::make('oldpassword'),
        ]);

        $request = new Request([
            'email' => 'newuser@example.com',
            'name' => 'New Name',
            'password' => 'newpassword123'
        ]);

        $response = $user->updateUser($request, $user->id);

        $this->assertArrayHasKey('id_user', $response);
        $this->assertDatabaseHas('users', ['email' => 'newuser@example.com']);

    }


    /** @test */
    //Testa a função deleteUser()
    public function deletes_a_user_successfully () {

        $user = User::create([
            'email' => 'test@example.com',
            'name' => 'Test User',
            'password' => bcrypt('password123'),
        ]);

        $response = $user->deleteUser($user->id);

        $this->assertArrayHasKey('id_user', $response);
        $this->assertEquals('Test User', $response['name']);

        $this->assertSoftDeleted('users', ['id' => $user->id]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'deleted_at' => now(),
        ]);

        $this->assertNull(User::find($user->id));

    }


    /** @test */
    // Testa a função userValidation()
    public function validates_user_existence () {

        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password123'),
        ]);

        $request = new Request([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);

        $response = $user->userValidation($request);

        $this->assertNotEmpty($response);
        $this->assertEquals($user->id, $response[0]['id']);
        $this->assertEquals('John Doe', $response[0]['name']);
        $this->assertEquals('john@example.com', $response[0]['email']);

    }
    /** @test */
    public function does_not_return_deleted_users () {

        $user = User::factory()->state(['deleted_at' => now()])->create([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
        ]);

        $request = new Request([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
        ]);

        $response = (new User())->userValidation($request);

        $this->assertEmpty($response);

    }
    // /** @test */
    public function returns_empty_if_no_user_matches () {

        $request = new Request([
            'name' => 'Nonexistent User',
            'email' => 'noone@example.com',
        ]);

        $user = new User();
        $response = $user->userValidation($request);

        $this->assertEmpty($response);

    }


    /** @test */
    // Testa a função userEmailValidation()
    public function validates_existing_email () {

        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password123'),
        ]);

        $request = new Request([
            'email' => 'john@example.com',
        ]);

        $response = (new User())->userEmailValidation($request);

        $this->assertNotEmpty($response);
        $this->assertEquals($user->id, $response[0]['id']);
        $this->assertEquals('john@example.com', $response[0]['email']);

    }
    /** @test */
    public function it_does_not_return_deleted_users () {

        $user = User::factory()->create([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'deleted_at' => now(),
        ]);

        $request = new Request([
            'email' => 'jane@example.com',
        ]);

        $response = (new User())->userEmailValidation($request);

        $this->assertEmpty($response);
        
    }
     /** @test */
    public function returns_empty_if_no_email_matches () {

        $request = new Request([
            'email' => 'doesnotexist@example.com',
        ]);

        $response = (new User())->userEmailValidation($request);

        $this->assertEmpty($response);
        
    }


    /** @test */
    // Testa a função randomUserPassword()
    public function generates_a_random_password () {

        $user = User::factory()->create();
        
        $userModel = new User();
        
        $generatedPassword = $userModel->randomUserPassword([$user]);

        $this->assertIsString($generatedPassword);
        $this->assertEquals(8, strlen($generatedPassword));

    }


    /** @test */
    // Testa a função searchUser()
    public function returns_a_user_when_id_is_valid () {

        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);

        $userModel = new User();

        $foundUser = $userModel->searchUser($user->id);

        $this->assertNotNull($foundUser);
        $this->assertEquals($user->id, $foundUser->id);
        $this->assertEquals('John Doe', $foundUser->name);
        $this->assertEquals('john@example.com', $foundUser->email);

    }
    /** @test */
    public function it_returns_null_for_deleted_users () {

        $user = User::factory()->create([
            'deleted_at' => now(),
        ]);

        $userModel = new User();

        $foundUser = $userModel->searchUser($user->id);

        $this->assertNull($foundUser);

    }
    /** @test */
    public function it_returns_null_if_user_does_not_exist () {

        $userModel = new User();

        $foundUser = $userModel->searchUser(9999);

        $this->assertNull($foundUser);

    }

}
