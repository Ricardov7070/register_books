<?php

namespace Tests\Unit\Services\Email;

use Tests\TestCase;
use App\Services\EmailService;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Support\Facades\Config;

class EmailServiceTest extends TestCase
{
    protected EmailService $emailService;

    protected function setUp (): void {

        parent::setUp();

        Config::set('mail.mailers.smtp.host', 'mailhog');
        Config::set('mail.mailers.smtp.port', 1025);
        Config::set('mail.mailers.smtp.username', 'test_user');
        Config::set('mail.mailers.smtp.password', 'test_password');
        Config::set('mail.from.address', 'test@example.com');
        Config::set('mail.from.name', 'Autenticação de Usuário');

        $this->emailService = new EmailService();

    }


    /** @test */
    // Testa o serviço EmailService.php
    public function initializes_phpmailer_correctly () {

        Config::set('mail.mailers.smtp.host', 'mailhog');
        Config::set('mail.mailers.smtp.port', 1025);
        Config::set('mail.mailers.smtp.username', 'test_user');
        Config::set('mail.mailers.smtp.password', 'test_password');

        $emailService = new EmailService();

        $reflection = new \ReflectionClass($emailService);
        $property = $reflection->getProperty('mail');
        $property->setAccessible(true);
        $mailer = $property->getValue($emailService);

        $this->assertInstanceOf(PHPMailer::class, $mailer);
        $this->assertNotNull($mailer->Username, 'PHPMailer Username está nulo');
        
        $this->assertEquals('test_user', $mailer->Username);
        $this->assertEquals('test_password', $mailer->Password);
        $this->assertEquals(1025, $mailer->Port);

    }
    /** @test */
    public function sends_an_email_successfully () {

        $mockMailer = $this->createMock(PHPMailer::class);

        $mockMailer->expects($this->once())->method('setFrom')
            ->with('test@example.com', 'Autenticação de Usuário');
        
        $mockMailer->expects($this->once())->method('addAddress')->with('recipient@example.com');
        $mockMailer->expects($this->once())->method('isHTML')->with(true);
        $mockMailer->expects($this->once())->method('send');

        $reflection = new \ReflectionClass($this->emailService);
        $property = $reflection->getProperty('mail');
        $property->setAccessible(true);
        $property->setValue($this->emailService, $mockMailer);

        $this->emailService->sendEmail(
            'recipient@example.com',
            'Test Subject',
            'Test Body',
            'test@example.com'
        );

        $this->assertTrue(true);

    }
    /** @test */
    public function handles_email_send_failure () {

        $mockMailer = $this->createMock(PHPMailer::class);
        $mockMailer->method('send')->will($this->throwException(new Exception('SMTP Error')));

        $reflection = new \ReflectionClass($this->emailService);
        $property = $reflection->getProperty('mail');
        $property->setAccessible(true);
        $property->setValue($this->emailService, $mockMailer);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('SMTP Error');

        $this->emailService->sendEmail(
            'recipient@example.com',
            'Test Subject',
            'Test Body',
            'test@example.com'
        );

    }

}
