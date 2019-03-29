if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

function showFacts() {
	var show = document.getElementsByTagName("DIV")[4];
		if (show.style.display === "block") {
			show.style.display = "none";
		} else {
			show.style.display = "block";
		}
}