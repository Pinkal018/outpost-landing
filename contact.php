<?php
// Handles the RedHop Media contact form. Runs on Hostinger (PHP hosting) —
// it will not work when the site is previewed on GitHub Pages, since that
// only serves static files and cannot execute PHP.

header('Content-Type: application/json');

$to = 'pinkalmakwana018@gmail.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Honeypot: real visitors never fill this hidden field, bots often do.
if (!empty($_POST['botcheck'])) {
    echo json_encode(['success' => true]);
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all fields with a valid email address.']);
    exit;
}

$safeEmail = str_replace(["\r", "\n"], '', $email);
$subject   = 'New enquiry from the RedHop Media website';

$body  = "New contact form submission from redhopmedia.com\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n\n";
$body .= "Message:\n{$message}\n";

$headers   = [];
$headers[] = 'From: RedHop Media Website <no-reply@redhopmedia.com>';
$headers[] = "Reply-To: {$safeEmail}";
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail could not be sent.']);
}
