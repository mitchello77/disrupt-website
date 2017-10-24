<?php require_once('includes/header.inc'); ?>
</head>
<body>

<?php

	// If the previous page was on our domain, display "Go Back"
	// Otherwise, display "Back to Homepage"
	if (isset($_SERVER['HTTP_REFERER'])) {
		$ref = $_SERVER['HTTP_REFERER'];
	}
	else {
		$ref = false;
	}

	if (strpos($ref, ROOT_URL) !== false || strpos($ref, ROOT_URL) !== false) {
		$cta = "<a href='javascript:;' onclick=\"window.history.go(-1); return false;\" class='cta'>Go back</a>";
	}
	else {
		$cta = "<a href='".ROOT_URL."' class='cta'>Back to Homepage</a>";
	}

	echo "
		<section>
			<h3>Sorry, we can't find the page you're looking for.</h3>
			".$cta."
		</section>
	";


	require_once('includes/footer.inc');
?>
