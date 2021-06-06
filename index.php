<!DOCTYPE html>
<html>
    <head>
        <link rel="shortcut icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
        <script
            src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

        <link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet" />
        <link href="style.css" rel="stylesheet" />
        <title>XKCD Comics | API</title>
    </head>
    <body>
        <div id="loader" class="loader__container d-flex align-items-center">
            <div class="loader"></div>
        </div>

        <main class="main__container">
            <h1 class="main__title pt-3 mb-3">XKCD Comics</h1>

            <div class="container">
                <div>
                    <button id="request-prev" class="btn btn-outline-dark mb-2">&lsaquo; Prev</button>
                    <button id="request-random" class="btn btn-outline-dark mb-2">Random</button>
                    <button id="request-next" class="btn btn-outline-dark mb-2">Next &rsaquo;</button>
                </div>
                <div>
                    <button id="request-first" class="btn btn-outline-dark mb-2">&laquo; First</button>
                    <button id="request-last" class="btn btn-outline-dark mb-2">Last &raquo;</button>
                </div>
            </div>

            <div class="container my-4">
                <h2 id="comic-title">Loading ...</h2>
                <img id="comic-image" class="img-fluid" />
            </div>
            <div id="comic-date">Loading...</div>
            <div id="comicNumber">Loading...</div>
            <div class="pt-1 mb-1">
                <h4 class="mb-3">Search Comics by ID</h4>
                <form id="comic-form" class="form-inline d-flex justify-content-center">
                    <div>
                        <input
                            aria-label="find comics by ID"
                            type="number"
                            id="search-input"
                            class="form-control form-control-sm mr-3"
                            placeholder="Comics number"
                            required
                        />
                    </div>
                    <button type="submit" class="btn btn-sm btn-dark">find</button>
                </form>
            </div>
            <div id="transcript" class="pt-1 mb-2"></div>
        </main>
    </body>
    <script src="https://unpkg.com/superagent"></script>
    <script src="script.js"></script>
</html>
