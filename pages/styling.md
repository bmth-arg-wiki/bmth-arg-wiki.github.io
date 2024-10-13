---
title: "Styling"
description: "Styling demo page."
categories: []
permalink: "/styling"
---
# Styling page

{% include content/info.html
title="Where love is the law, a Youtopia"
icon="fa-solid fa-heart"
content="Welcome to the styling page! This is just for reference."
%}

This page should contain all styling used in the Wiki, for testing and design purposes. :)

## Buttons

{% include content/buttons/button-danger.html text="Official MV" link="https://www.youtube.com/watch?v=xv-70a6yXfM" %}
{% include content/buttons/button-danger.html text="Official LV" link="https://www.youtube.com/watch?v=L6tHMDaGgho" %}

{% include content/buttons/button-primary.html text="NME interview" icon="fa-solid fa-microphone"
link="https://www.nme.com/big-reads/bring-me-the-horizon-cover-interview-2020-post-human-survival-horror-2804768" %}

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

## Gallery

{% include gallery.html folder="characters/syko/gallery" %}

## Video

Most videos are not allowed to be embedded, but the few that are can be embedded like this:

{% include content/video.html link="https://www.youtube.com/embed/1IQpJULLt-4" %}

## Read More

- [Link to an article](for-sof/for-sof)
- [Another link](characters/selene)