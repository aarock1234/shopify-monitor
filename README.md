## Shopify Monitor
Hello, I am [Rock](https://www.twitter.com/rockkdev) from the team at [StormeIO](https://www.twitter.com/stormeio) and I have decided to open-source a project of mine. It scans and waits for any changes on any Shopify site. Any product added/restocked will be sent to a webhook provided in the *config.json* file. I kindly ask you to not steal the code and rebrand it, at minimum keep the footer message.

## Example Images

![Unable to Load Preview.](https://i.imgur.com/qO9RBAu.png)
![Unable to Load Preview.](https://i.imgur.com/ZC0oMB2.png)


## Installation & Usage

> **How do I setup and use this thing?**
> 
> 1. First, you must install NodeJS, which can be installed here (pick LTS):
>> https://nodejs.org/en/download/
>
> 2. Next install Git from here:
>> https://git-scm.com/downloads
>
> 3. Next, you need to open your terminal/command prompt. On windows press *Windows Key* and then type `cmd` and click enter. On Mac open Terminal *(its pre-installed)*. Now type this:
>> `git clone https://github.com/aarock1234/shopify-monitor`
>
> 4. After it has completed you must type this:
>> `cd shopify-monitor`
>
> 5. Now you can open up the file explorer using the command `explorer` on Windows and `open .` on a Mac *(don't forget the `.` after open)*.
> 6. Now navigate to the user folder.
> 7. Now you must navigate to the config folder and add proxies into the *proxies.txt* file, edit the Discord webhook URL inside of *webhooks.txt*, add your sites in *sites.txt*, and finally edit your delay in *config.json*. You can edit this with any standard text editor.
> 8. Now that everything is set up go back to your command prompt/terminal and type this:
>> `npm install`
>
> 9. Now, wait for it to install completely.
> 10. Now you can type this command:
>> `npm start`
>
> 🎉 DONE! 🥳 You are now monitoring Shopify. Please report any issues in the issues tab.

## Extra

### Planned Additions
* Filter for keywords
* Support for user pinging based on keywords
* Slack webhook support

### Development

This is really easy to edit if you are proficient in NodeJS. I encourage any devs to make a fork and add any features they would like.