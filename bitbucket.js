(function () {
    var ticketNrRegex =  /[A-Z]{2,}-\d+/;

    setInterval(function() {
        // in commit message;
        var branchNameEl = document.querySelector('div:nth-child(3) > div > span > span.branch-name');
        if (branchNameEl) {
            var branchName = branchNameEl.innerText;
            var commitMessage = document.querySelector('#id_commit_message').value;
            var oldMsg = 'Merged master into ' + branchName;
            if (commitMessage == oldMsg) {
                var ticketNr = branchName.match(ticketNrRegex)[0];
                console.log(ticketNr);
                var newText = ticketNr + ': merged master';
                document.querySelector('#id_commit_message').value = newText;
                console.log('jira brancher renamed: ' + oldMsg + ' => ' + newText);
            }
        }

    }, 100);
}())
