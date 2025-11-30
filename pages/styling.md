---
title: "Styling"
description: "Styling demo page."
categories: []
permalink: "/styling"
previous: "/styling"
previous_text: "Previous page"
next: "/styling"
next_text: "Next page"
---
# Styling page

This page should contain all styling used in the Wiki, for testing and design purposes. :)

## Author messages

The following messages are available, with custom icons, titles and content. More can be made 
with relative ease.

{% include content/info.html
title="Where love is the law, a Youtopia"
icon="fa-solid fa-heart"
content="Welcome to the styling page! This is just for reference."
%}

{% include content/danger.html
title="Trigger Warning"
content="This article deals with triggering topics, like X."
%}

{% include content/editors-note.html
title="Editor's note"
content="This article deals with triggering topics, like X."
%}

## Messages from fans

For the fan art page, we designed a new component where people can leave their own messages. 
They have separate styling to indicate that they are separate from the block quotes we use for canon documents.

{% include content/message/message.html
content="I am a very dangerous the danger message!"
color="danger"
%}
{% include content/message/message.html
content="I am the info message!."
color="info"
%}
{% include content/message/message.html
content="I am the message using the link colour yippee yay!."
color="link"
%}
{% include content/message/message.html
content="Before the danger there is the warning blabla."
color="warning"
%}
{% include content/message/message.html
content="THIS IS THE MAIN COLOUR! YEAH."
color="primary"
%}
{% include content/message/message.html
content="THIS IS A SUCCESS MESSAGE! very exciting but nothing actually needs this class usually."
color="success"
%}

## Buttons

YouTube button styling:

{% include content/buttons/button-danger.html text="Official MV" link="https://www.youtube.com/watch?v=xv-70a6yXfM" %}
{% include content/buttons/button-danger.html text="Official LV" link="https://www.youtube.com/watch?v=L6tHMDaGgho" %}

Primary styling:

{% include content/buttons/button-primary.html text="NME interview" icon="fa-solid fa-microphone"
link="https://www.nme.com/big-reads/bring-me-the-horizon-cover-interview-2020-post-human-survival-horror-2804768" %}

Variations:

{% include content/buttons/button-info.html text="Info" %}
{% include content/buttons/button-danger.html text="Danger" %}
{% include content/buttons/button-link.html text="Link" %}
{% include content/buttons/button-primary.html text="Primary" %}
{% include content/buttons/button-success.html text="Success" %}
{% include content/buttons/button-warning.html text="Warning" %}

## Secrets

<details>
<summary>Click me for the secret project DUST password</summary>
{{ "
Using this [Instagram post](https://www.instagram.com/p/C8kLLWdC2MS/), 
we can find the solution, reading the symbols from top to bottom.

![Project DUST symbols](https://raw.githubusercontent.com/bmth-arg-wiki/wiki-assets/main/socials/project_dust_password_post.png)
" | markdownify }}
</details>

## Table

Example snippet from [FOR SOF](for-sof).

| File                                   | Status | About            |
|----------------------------------------|--------|------------------|
| [msgforsoff.aiff](for-sof/msgforsof)   | ✔️     | [📁](#read-more) |
| [The Insight Documents](lore/insights) | ✔️     | [📁](#read-more) |
| [CAPSLOCK.DOC](for-sof/capslock_doc)   | ✔️     | [📁](#read-more) |

## Image on the page

![Poster for Skys & the Starjammers](https://raw.githubusercontent.com/bmth-arg-wiki/wiki-assets/main/files/skys_starjammers/sky.png)

## Page Card Gallery

{% assign page_links = '/pages/website/website, /pages/for-sof/for-sof, /pages/characters/characters, /pages/lore/lore, /pages/music/music, /pages/fanart/fanart' | split: ", " %}
{% include page-card-gallery.html links=page_links %}

## Gallery

{% include gallery.html folder="characters/syko/gallery" %}

### Gallery with next & previous buttons

{% include gallery-nav.html folder="lore/booklet/gallery" %}

## Video

Most videos are not allowed to be embedded, but the few that are can be embedded like this:

{% include content/video.html link="https://www.youtube.com/embed/1IQpJULLt-4" %}

## Read More

- [Link to an article](for-sof/for-sof)
- [Another link](characters/selene)