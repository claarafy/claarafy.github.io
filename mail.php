<?php

	$to = "messeinlove@gmail.com"; // this is your Email address

	$from  = "contact@messeinlove.com";

	$sender_name = $_POST['Name'];
	$email  = $_POST['Email']; // this is the sender's Email address
	$number_of_guests = $_POST['Guests'];
	$events = $_POST['Attendance'];
	$notes = $_POST['Message'];

	$subject = "RSVP from : " . $sender_name;
	$message =
	"\n\n" .
	"You got a RSVP from : " . $sender_name . "\n\n" .
	"Name : " . $sender_name . "\n" .
	"Email : " . $email . "\n" .
	"Number of Guests : " .  $number_of_guests . "\n" .
	"Attending : " . $events . "\n" .
	"Message : ". "\n\n" . $notes;

	$headers = 'From: ' . $from;
	mail($to, $subject, $message, $headers);

?>
