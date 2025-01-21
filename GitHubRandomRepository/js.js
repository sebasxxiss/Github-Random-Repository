const $select=document.querySelector("#selectButton")
const $repoInfo=document.querySelector("#Repository")
const $projectName=document.querySelector("#ProjectName")
const $refresh=document.querySelector("#Refresh")
const $language=document.querySelector("#Language span")
const $stars=document.querySelector("#Stars span")
const $forks=document.querySelector("#Forks span")
const $issues=document.querySelector("#Issues span")
const $languageDiv=document.querySelector("#Language")
const $starsDiv=document.querySelector("#Stars")
const $forksDiv=document.querySelector("#Forks")
const $issuesDiv=document.querySelector("#Issues")

//use your api key
const APIKEY=''

let programmingLanguagesArray=[]
let dataLanguage;
let repos;
let link;
let hasInformation=false;
let error=false


async function fetchData() {
    const rawFetch = await fetch("https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json")    
    const fetchedData= await rawFetch.json()
    return fetchedData
}
document.addEventListener("DOMContentLoaded",async ()=>{
    hideElements()
    let data= await fetchData()
    for(let i=0;i<=306;i++){
        let optionListItem=document.createElement("option")
        optionListItem.innerText= data[i].title
        optionListItem.id="o"+i
        optionListItem.onclick=RequestData
        $select.appendChild(optionListItem)
    }
})
$refresh.addEventListener("click",async ()=>{
    if(error==true){
        LoadingState()
        const rawData= await fetch(link,{auth: APIKEY})
        stateHandler(rawData)
    }else{
        let randomNumber=Math.floor(Math.random()*dataLanguage.items.length)
        FillState(repos, randomNumber)
    }
})

async function RequestData(){
    LoadingState()
    let name = this.innerText;
    if(name=="All Languages"){
        link=`https://api.github.com/search/repositories?q=stars%3A>-1+&type=repositories&per_page=100&`
        const rawData= await fetch(link,{
        auth: APIKEY
        })
        stateHandler(rawData)
    }else{
        link=`https://api.github.com/search/repositories?q=language:${name}&type=repositories&per_page=100&`
        const rawData= await fetch(link,{
        auth: APIKEY
        })
        stateHandler(rawData)
    }
}
async function stateHandler(rawData){
    if(rawData.ok==true){
        hasInformation=true
        $select.disabled=""
        error=false
        ShowReferesh()
        dataLanguage= await rawData.json()
        let randomNumber=Math.floor(Math.random()*dataLanguage.items.length)
        repos=dataLanguage.items
        FillState(repos ,randomNumber)
        $languageDiv.hidden=""
        $starsDiv.hidden=""
        $forksDiv.hidden=""
        $issuesDiv.hidden=""
    }if (rawData.ok!=true){
        hasInformation=true
        ShowReferesh()
        failRequest()
    }
}

function FillState(repos, randomNumber){
        $projectName.innerText=repos[randomNumber].name
        if(repos[randomNumber].description==null){
            $repoInfo.innerText="No description"    
        }else{
            $repoInfo.innerText=repos[randomNumber].description
        }
        $languageDiv.innerText=repos[randomNumber].language
        $stars.innerText=repos[randomNumber].watchers
        $forks.innerText=repos[randomNumber].forks
        $issues.innerText=repos[randomNumber].open_issues
}
function LoadingState(){
    $select.disabled=true
    $language.innerText=""
    $stars.innerText=""
    $forks.innerText=""
    $issues.innerText=""
    hideElements()
    $projectName.innerText=""
    $repoInfo.innerText=""
    $repoInfo.innerText="Loading..."
    
}
function hideElements(){
    $languageDiv.hidden=true
    $starsDiv.hidden=true
    $forksDiv.hidden=true
    $issuesDiv.hidden=true
    $refresh.hidden=true
}
function ShowReferesh(){
    if (hasInformation==true){
        $refresh.innerText="Refresh"
        $refresh.hidden=""
    }
}
function failRequest(){
    error=true
    $select.disabled=""
    $repoInfo.innerText="Error fetching repositories"
    $refresh.innerText="Click to rerty"
}