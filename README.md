# Atlassian helpers

A life improvement utils for jira, bitbucket and mercurial

### Features

Clicking on J button in chrome while in jira or bitbucket will create/checkout branch (old branch will be stashed) [requires hg-stash]
Sync with master button in bitbucket PR, will automatically rename commit message into "JIRA-1337: merged master"

hg bb # opens bitbucket branch diff
hg pr # opens bitbucket create new PR for branch
hg jira # opens jira ticket by branch name

when commiting to mercurial will automaticaly prepend jira ticket in commit message


### Installing


```
git clone git@github.com:arturasz/atlassian-helpers.git
```

Change urls to your servers if needed (or submit PR for more universal solution"

add this to you ~/.hgrc (make sure your path is path to the file)

```
[extensions]
atlassian-helpers = ~/Code/atlassian-helpers/hg-helpers.py
```

If you use source tree you will have to enable this in extensions options


Add this to you ~/.zshrc (make sure your path is path to the file)
Might not be the best option, but generally when you "login" to terminal will start the server in the background.

```
nohup node ~/Code/atlassian-helpers/server.js &>> ~/Code/atlassian-helpers/log.out &
```

**IMPORTANT**: until smarter solution implemented, go to Firewall and block incoming connections. Although worst thing that might happen, someone outside will start making a bunch of new branches on your local machine (injection should not happen due to parsing a-Z0-9, but still...

goto chrome://extensions/ in Chrome
enable Developer mode
add ~/Code/atlassian-helpers extension

## TODO:

1. add ssl to node
2. make xhr request instead of images
3. show response from server in browser
4. smarter server starter
5. remove dependecy to links

## Authors

* **Artūras Zakrevskis** - *Initial work* 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
