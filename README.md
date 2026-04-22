# The Maze — Interactive Essay

An interactive digital labyrinth exploring land, capitalism, gentrification, and BIPOC community. Built as a visual essay where users navigate through image choices until reaching written dead ends.

---

## Live Demo (GitHub Pages)

Once deployed, your site will be at:
`https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## Setup on GitHub Pages

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it (e.g., `land-maze`)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload the Files

**Option A: GitHub web interface (easiest)**
1. In your new repo, click **Add file → Upload files**
2. Drag and drop the entire project folder contents
3. Make sure the folder structure is preserved:
   ```
   index.html
   css/style.css
   js/maze-data.js
   js/maze.js
   images/
     placeholder/
     (your images go here)
   README.md
   ```
4. Click **Commit changes**

**Option B: Git command line**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Click **Save**
5. Wait ~1 minute, then visit the URL shown

---

## Customizing the Maze

**All content is in one file: `js/maze-data.js`**

Open it in any text editor. It is organized into clear sections.

---

### 1. Changing the Intro Screen

```js
intro: {
  title: "Enter the Maze",           // Large heading
  body: `Your intro text here...`,   // Supports <em>, <strong>, <br>
  enterLabel: "Enter"                // Button text
},
```

---

### 2. Adding Your Images

1. Place your `.jpg`, `.png`, or `.webp` image files in the `/images/` folder
2. All images will be displayed as **squares** — crop them square before uploading for best results (e.g., 800×800px)
3. Reference them in `maze-data.js` by filename:

```js
left: {
  image: "images/your-photo.jpg",   // path from root
  alt: "Description for screen readers",
  goTo: "some-node-id"
}
```

---

### 3. Building the Maze Structure

Each **node** is a step in the maze. There are two types:

#### Choice Node (two images to pick from)
```js
"my-node-id": {
  type: "choice",
  left: {
    image: "images/photo-a.jpg",
    alt: "Alt text",
    goTo: "next-node-id"       // which node this leads to
  },
  right: {
    image: "images/photo-b.jpg",
    alt: "Alt text",
    goTo: "another-node-id"
  }
}
```

#### Dead End Node (text screen)
```js
"my-deadend-id": {
  type: "deadend",
  text: `Your text here. Supports <em>italics</em>, <strong>bold</strong>, and <br> line breaks.`
}
```

#### Connecting Nodes

The `goTo` value of any option must match the `id` of another node exactly. You can create chains of any length:

```
root → branch-a → branch-a-left → deadend-one
                ↘ branch-a-right (another deadend)
     ↘ branch-b → branch-b-left → deeper-branch → deadend-two
                ↘ deadend-three
```

#### Setting the Start Node

```js
start: "root",   // Change "root" to the id of your first node
```

---

### 4. Example: Adding a New Branch

```js
// Add a new choice node
"branch-new": {
  type: "choice",
  left: {
    image: "images/soil.jpg",
    alt: "Hands in soil",
    goTo: "deadend-land"
  },
  right: {
    image: "images/tower.jpg",
    alt: "Glass tower",
    goTo: "deadend-capital"
  }
},

// Add the dead ends it links to
"deadend-land": {
  type: "deadend",
  text: `Land remembers those who tend it.`
},

"deadend-capital": {
  type: "deadend",
  text: `Capital sees land as asset. Community sees land as home.`
},
```

Then link an existing node to `"branch-new"` by setting its `goTo: "branch-new"`.

---

## Design Notes

- **Color palette**: Earthy — cream, ink, dust, moss, earth-red
- **Typography**: Playfair Display (serif) for titles and dead ends; IBM Plex Mono for UI text
- **Images**: Displayed as squares with a subtle zoom-on-hover; slight desaturation by default that lifts on hover
- **Dead ends**: Rendered on a slightly warm paper tone to distinguish from choice screens
- **Restart button**: Always visible in the top-right during the game (hidden on intro)
- **Mobile**: Stacks images vertically on small screens

---

## File Structure

```
land-maze/
├── index.html          ← Main HTML (rarely needs editing)
├── css/
│   └── style.css       ← All styling
├── js/
│   ├── maze-data.js    ← YOUR CONTENT (edit this)
│   └── maze.js         ← Engine (rarely needs editing)
├── images/
│   ├── placeholder/    ← Remove these when adding real images
│   └── (your images)
└── README.md
```

---

## Tips

- **Dead ends** can be as long or short as you like — the text box adjusts
- **The same node** can be linked to by multiple paths (convergence is allowed)
- **Circular loops** are technically possible but will confuse users — use sparingly
- Use `<br><br>` in dead end text to create paragraph breaks
- Use `<em>text</em>` for italics (styled in the earth-red color)
- Test on mobile — the layout adapts but image choices look best around 70vw on phone screens
