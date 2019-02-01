document.getElementById('search').addEventListener('keyup', findUsers);
let userImage = document.querySelector(".user-image");
let userBio = document.querySelector(".card-header");
let userbadge = document.querySelector(".user-badge");
let repoList = document.querySelector(".repo-list");

function findUsers(e) {

    var username = e.target.value;
    console.log(username);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${username}`, true);
    xhr.onload = function () {
        if (this.status == 200) {
            var user = JSON.parse(this.responseText);
            userBio.innerHTML = `${user.name}`;
            userImage.innerHTML = `
            <img src="${user.avatar_url}" class="img-thumbnail" width="150px" height="150px">
            <div class="mt-1 container"><a class="btn btn-primary center"src="${user.html_url}">github profile</a></div>
                
            `;
            userbadge.innerHTML = `<button class="btn btn-primary">
        <span class="badge">Repos ${user.public_repos}</span>
    </button>
    <button class="btn btn-primary">
        <span class="badge">followers ${user.followers}</span>
    </button>
    <button class="btn btn-danger">
        <span class="badge"> Following ${user.following}</span>
    </button> 
    <ul class="list-group mt-2">
              <li class="list-group-item">company:${user.company}</li>
              <li class="list-group-item">Website:${user.blog}</li>
              <li class="list-group-item">Location:${user.location}</li>
              <li class="list-group-item">Member Since:${user.created_at}</li>           
    </ul>
</div>

`;
            console.log(user);

            var xhr1 = new XMLHttpRequest();
            xhr1.open('GET', `https://api.github.com/users/${username}/repos`, true);
            xhr1.onload = function () {
                if (this.status == 200) {
                    var repo = JSON.parse(this.responseText);
                    console.log(repo);

                    for (var i = 0; i <= repo.length; i++) {
                        var reposs = document.createElement('p');
                        reposs.classList.add("list-group-item");

                        reposs.innerHTML = `${repo[i].name}`;
                        repoList.append(reposs);
                    }

                    ;
                }

            }
            xhr1.setRequestHeader('Authorization', 'access_token 19a3e7846dcae40a303aedeb29073cbdc0d37740', );
            xhr1.send();


        }


    }

    xhr.setRequestHeader('Authorization', 'access_token 19a3e7846dcae40a303aedeb29073cbdc0d37740', );
    xhr.send();
}
