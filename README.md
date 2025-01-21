# Github-Random-Repository
Simple web page that gives you a random repository in any language you want (project idea from https://roadmap.sh/projects/github-random-repo)
This project is a JavaScript-based application that fetches and displays GitHub repositories based on selected programming languages. Users can select a language, view repository details, and refresh to get new repositories or retry fetching data in case of an error.
Features

    Fetches a list of programming languages from a predefined JSON source.
    Allows users to search GitHub repositories by language or view all repositories.
    Displays repository details such as name, description, language, stars, forks, and open issues.
    Includes a "Refresh" button to load random repository data or retry failed requests.

Technologies Used

    JavaScript: Core logic and DOM manipulation.
    GitHub API: Fetches repository data.
    HTML & CSS: For structuring and styling the application.

How It Works

    Languages List: Upon loading, the app fetches a list of programming languages from a remote JSON file and populates a dropdown menu.
    Repository Search: Users can select a language from the dropdown to fetch repositories matching the language or view all repositories.
    Random Repository: Displays a random repository from the fetched results.
    Refresh & Retry:
        Refresh loads a new random repository.
        Retry fetches data again in case of errors.

Setup Instructions

    Clone this repository to your local machine:

    git clone https://github.com/your-username/repository-name.git

    Open the index.html file in a web browser to run the application.
    Add your GitHub API key to the APIKEY variable in the JavaScript file for authenticated requests.

Code Overview
Key Variables

    $select: Dropdown for selecting languages.
    $repoInfo: Displays repository description.
    $projectName: Shows the repository name.
    $refresh: Refresh button for retrying or fetching new data.
    $language, $stars, $forks, $issues: DOM elements for displaying repository stats.

Key Functions

    fetchData(): Fetches the list of programming languages from the source JSON.
    RequestData(): Makes a GitHub API request based on the selected language.
    stateHandler(rawData): Handles API responses and updates the UI accordingly.
    FillState(repos, randomNumber): Populates repository details into the UI.
    LoadingState(): Sets the UI to a loading state during API requests.
    hideElements(): Hides UI elements initially or during errors.
    ShowReferesh(): Displays the refresh button after data is fetched successfully.

API Usage

This app uses the GitHub Search API to fetch repository data. The API endpoints include:

    All Languages: https://api.github.com/search/repositories?q=stars%3A>-1+&type=repositories&per_page=100
    By Language: https://api.github.com/search/repositories?q=language:{language_name}&type=repositories&per_page=100

    Note: Replace {language_name} with the name of the selected programming language.

Error Handling

    If the API request fails, an error message is displayed, and the user can retry by clicking the "Refresh" button.

Future Improvements

    Add pagination for larger result sets.
    Include additional repository details (e.g., last updated date).
    Improve error messages for better clarity.

