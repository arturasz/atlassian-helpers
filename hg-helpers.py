#!/usr/bin/python
import re
import mercurial, sys, os
from mercurial import cmdutil

_branch_regex = re.compile('(feature|bug|case|bugid|fogbugz)_(\d+)')
_commit_regex = re.compile(r'\b(?P<case>(review|case|bug[zs]?(\s| )*(id)?:?)s?(\s| )*([#:; ]| )+)((([ ,:;#]|and)*)(?P<bugid>\d+))+',re.I)
_jira_ticket_regex = r'[A-Z]{2,}-\d+'

def reposetup(ui, repo):

    commitctx = getattr(repo, 'commitctx', None)
    #Create a derived class that actually does what you want.
    class JiraTicketAdder(repo.__class__):
        def commitctx(self, ctx, *args, **kwargs):
            # print('bname:', repo[None].branch())
            try:
                ticketNr = re.search(_jira_ticket_regex,repo[None].branch()).group(0)
                issue_id_present = bool(re.search(r'[A-Z]{2,}-\d+', ctx._text))
                if not issue_id_present:
                    ctx._text = ticketNr + ': ' + ctx._text

                # match = _branch_regex.match(ctx.branch())
                # if match:
                #     ctx._text += ' BugID:'+ match.groups()[1]
            except:
                print "Error occured while trying to add ticket number, are you on master?"
            return commitctx(ctx, *args)

    #Make sure to actually use the new subclass.
    repo.__class__ = JiraTicketAdder


cmdtable = {}
command = cmdutil.command(cmdtable)

@command('jira', [])

def jira(ui, repo, **opts):
    """open jira.
    """
    ticketNr = re.search(_jira_ticket_regex,repo[None].branch()).group(0)
    os.system("open https://hotjar.atlassian.net/browse/" + ticketNr)
    print(ticketNr)

@command('pr', [])
def pr(ui, repo, **opts):
    """open jira.
    """
    branch_name = repo[None].branch()
    os.system("open https://bitbucket.org/hotjar/insights/pull-requests/new?source=" + branch_name)

@command('bb', [])
def pr(ui, repo, **opts):
    """open jira.
    """
    branch_name = repo[None].branch()
    os.system("open https://bitbucket.org/hotjar/insights/branch/" + branch_name + "#diff")
### Finish off the extensions stuff

# We aren't adding any commands to hg.
# cmdtables = {}

# #List of known compatible versions of hg.
# testedwith = '4.4.1'
