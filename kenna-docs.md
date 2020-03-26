# Kenna - Documentation
Kenna is built for non-technical teachers to build blogs and an online prescence easily and elegantly.  
If any point in this documentation file is unclear, please open an issue here on GitHub or email kewbish@gmail.com - I'll do my best to revise the documentation to make it more clear and help you out.  
Alternatively, if you'd like to file a change yourself (and know how to do so - GitHub knowledge is required), please open a PR; I promise to review the changes as soon as I can.  

## Table of Contents
- [Download Kenna](#download-kenna)
- [Customizing the base theme](#customizing-the-base-theme)
- [Changing class names](#changing-class-names)
- [GitHub setup](#github-setup)
- [Adding a post](#adding-a-post)
- [Custom features](#custom-features)

## Download Kenna
To use Kenna, you'll have to download a copy of these base files. Navigate to the top of the files navigator in GitHub, and click the `Clone or download` button.  
![Clone or download](https://i.imgur.com/ebhHWxj.png)
Then, select `Download as ZIP`, and wait for the files to download.  
Next, unzip the files with your favourite unZIPper. (Usually, right-click and select `Extract All`.)  
As well, set up Hugo on your computer - instructions to do so can be found [here](https://gohugo.io/getting-started/).  

## Customizing the base theme
*Note: You'll need Hugo to be installed to re-deploy and customize your blog. Instructions to do so can be found [here](https://gohugo.io/getting-started/). In the future, a setup script will be provided.*
In your file explorer, navigate to the unzipped files, and find the `theme\kenna\static\css\main.css` file.  
Open the file by double-clicking it (opening in Notepad is fine!).  
The first element there will be a `:root{}` element, which you can customize.  
```
:root {
    --cover-gradient: #6a45807e;
    --background-shadow: #3d214d;
    --button-background: #6a4580;
    --base-one: black;
    --base-two: white;
    --color-one: #9873c2;
    --color-two: #ba97e2;
    --font-one: Montserrat;
    --font-two: "Abril Fatface";
    --back-image: url("https://images.unsplash.com/photo-1477511801984-4ad318ed9846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
}
```
All the colors here are in something called `hexadecimal format`. You can choose these by Googling `color picker` and using the user interface to choose a color. Usually, it'll spit out a `#` followed by a couple numbers.  
Don't delete the `;` at the end of each line.  
The `--cover-gradient: #6a45807e;` line controls the gradient cover. Choose a cover that's darker than your base color, and add `7e` at the end of the 6-digit number.  
The `--background-shadow` controls the box-shadow color of the first inner header. Choose a medium color.  
The two base colors should be dark / light, or light / dark, depending on the rest of the colors you choose. Ensure text remains readable, and that contrast is high.  
`--color-one` and `--color-two` will be your main colors. `--color-one` should be darker than `--color-two`.
`--font-one` is the main font used. Choose something readable. Note that if you edit this, you'll need to download the font file from a reliable source, and put it into the `theme\kenna\static\fonts\` file. As well, you'll have to change the file name near the end of the `main.css` file.
```
@font-face{
    font-family: Montserrat;  /* change this reference name */
    src: url("../fonts/Montserrat-Medium.ttf"); /* change the file name after the /fonts/ bit */
}
```  
`--font-two` is the header display font. Something a little more decorative is acceptable. If you'd like to change it, follow the instructions above.  
`--back-image` is the URL of the image used. Upload your image to a file-sharing site like `Imgur`, and get the image URL (not the page URL). You can find this by right-clicking, and selecting `Open image in new tab` or equivalent. Take the URL (link in the search bar), and paste it into the `url()` selector so it looks like:  
`    --back-image: url("i.imgur.com/numbers.png")`  
Don't touch any of the other selectors or styles, unless you have CSS knowledge. To learn CSS, I recommend referencing [w3schools.com](https://w3schools.com).  

## Changing Class Names
To change class names, a lot of renaming is required. *In the future, an automation script will be provided.*   
You can simply use Notepad or a simple text editor to edit.  
First, link the current three `classid`s to your desired classes. Make notes and remember to be consistent with what you change the `classid`s to. For example, if you change `classid1` in one place to `english11`, remember to do this for all the `classid1`s you see.  
These must be unique, so you can't have two `english11` classes. Try `english11a` and `english11b`, for example.  
Another note: you can't have spaces in your names when you're editing between a pair of < angle brackets >, but you can when they're outside the brackets (like >so<). If uncertain, go without spaces and special characters.  
Change the following:  
- In `themes\kenna\layouts\index.html`:
    * Change the 
    ```
    <td><a href="/classid1\\index.html"><button>Classid1</button></a></td>
    ```
    `/classid1` and `Classid1` -> your class. To reiterate above, the `/classid1\\` cannot have spaces, but the Classid1 is parsed as plain text and can have spaces.
    * Find this part of the markup:
    ```
    <section>
            <div class="main-split" id="main-information">
                <div>
                    <h1>First Class</h1>
    ```
    First Class -> your class name. (This can have spaces!)
    * `{{ range first 3 (where .Site.Pages "Params.class" "classid1").ByDate.Reverse }}`
    "classid1" -> your class. (This can't have spaces.)
    * Repeat for `classid2` and `classid3`.
- Rename the `content\classid1` folder to your class name. For example: `content\english11`.
    * In the example `post-1.md`, change the `class: "classid1"` line to whatever you'd like. Alternatively, just delete this file.
    * Repeat for the `classid2` and `classid3` folders and example posts.
- Rename the `content\classid1.html` to your class name. For example: `content\english11.html`.  
    * Change the `<title>Classid1 Updates</title>` to whatever you'd like.
    * Make sure you edit the `<h1>Classid1 Updates</h1>` too. (This and the above can have spaces.)
    * Change `{{ range (where .Site.Pages "Params.class" "classid1").ByDate.Reverse }}` to your class name. For example,  
    ```
    {{ range (where .Site.Pages "Params.class" "english11").ByDate.Reverse }}
    ```
- In `themes\kenna\static\admin\config.yml`:
    * Change the `name`, `label` and `folder` for each collection. There should be one for each class. `name` and `folder` cannot have spaces, while `label` can.

## GitHub Setup
This requires Hugo to be installed. *In the future, a setup script will be provided.*
Sign up for a GitHub account. Create a repository by clicking the `+` button in the upper-right. Make sure the repository name is `yourusername.github.io`. For example, if your username is kewbish, the repository name should be `kewbish.github.io`.  
Navigate to `themes\kenna\layouts\static\admin\config.yml` and open it in Notepad. Change the `repo: kewbish/kenna` line to `repo: yourusername/yourusername.github.io`.  
Navigate to [this link](https://github.com/settings/developers), and make a `New OAuth App`. Put whatever you'd like for the name, but ensure that the Homepage URL is `yourusername.github.io`, where yourusername is your username. As well, make sure the `Authorization callback URL` goes to `https://api.netlify.com/auth/done`.  
This will generate a GitHub OAuth app. Keep this page open.  
Next, you'll need to sign up for a Netlify.com account. Sign in with your GitHub account.  
Add a new site from Git, and choose your site's repository. This should look like `yourusername/yourusername.github.io`.  
Next, navigate into the site `Settings > Access Control > OAuth`. Click the `Install provider` button.  
Choose GitHub as the provider, and copy your client ID and secret from the GitHub New OAuth app page.  
Finish customizing your site here - change colours, classes, and everything else while you're here.
Once you're 100% customizing your site, open `Terminal` or `Command Prompt` and navigate to your folder. Usually, you can do this by opening the site folder in a File Explorer, and right-click to select `Open in Terminal` or `Open in Command Prompt`.  
Check that there isn't a `public` folder in File Explorer. If there is, delete it.  
Run `hugo`, which will generate a `public` folder.  
Open GitHub, and open your repository you just created. Click the `Upload files` button (next to the `Clone or download` section), and upload the contents of the `public` folder, not including the folder itself. Add a commit message if you'd like, and click `Commit` at the bottom.  
Go back to the repository, and open its settings page. Find the `GitHub Pages` area, and in the Source, choose `master`.
You may have to wait a while as GitHub Pages processes files, but otherwise, the site will appear at `yourusername.github.io` (replace yourusername with your username) when you navigate there in a web browser.  

## Adding a post
### Web interface
Log into your admin panel (at `/admin` of your site - so if your site was at `kewbish.github.io`, navigate to `kewbish.github.io/admin`). This feature is provided by [NetlifyCMS - thanks!](https://netlifycms.org) Your credentials are the same as your GitHub account.  
You can then find the button to add a post, and edit as you will.  
Markdown is available (experiment with the advanced interfaces if you're comfortable) and may be required to edit the class property properly.  
### Local interface
I don't recommend this - try using the web interface. However, if you're confident with the command line, go ahead!  
This requires you to have Hugo installed. Check [here](#installation) for more information.  
Open your `Terminal` or `Command Prompt` (on MacOS / Linux and Windows, respectively). You might need to look up instructions for opening a folder in your terminal, but usually, you can right-click in your file explorer and select `Open in Command Prompt / Terminal`.  
Run the `hugo new yourclassname/yourpostname.md`, where `yourclassname` is your class name (no spaces!), and `yourpostname` as your post name. Personally, in my site, I usually use the YYMMDD format.  
Then, you can open the resulting file in a text editor, or just leave it, and publish your site (and go for the web interface.)

## Custom features
If you'd like a custom feature implemented for your site, please email kewbish@gmail.com for a consultation. I'll be happy to work with you to build an online prescence tailored to you and your students.