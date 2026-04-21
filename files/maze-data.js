/**
 * MAZE CONFIGURATION
 * ==================
 * Edit this file to customize the maze content.
 *
 * STRUCTURE:
 * - Each node has a unique `id`
 * - Each node is either a "choice" (two images) or a "deadend" (text screen)
 * - Choice nodes have a `left` and `right` option, each pointing to a child node id
 * - Dead end nodes have a `text` field (supports basic HTML like <em>, <strong>, <br>)
 *
 * IMAGES:
 * - Place image files in the /images/ folder
 * - Reference them by filename only (e.g., "forest.jpg")
 * - Images will be displayed as squares
 *
 * ALT TEXT:
 * - Always provide `alt` descriptions for accessibility
 */

const MAZE_CONFIG = {

  // ─── INTRO SCREEN ───────────────────────────────────────────────────────────
  intro: {
    title: "Enter the Maze",
    body: `You are about to walk through a labyrinth. 
    Each turn is a choice.<br><br>
    <em>Choose with intention.</em>`,
    enterLabel: "Enter"
  },

  // ─── STARTING NODE ──────────────────────────────────────────────────────────
  start: "root",

  // ─── NODES ──────────────────────────────────────────────────────────────────
  nodes: {

    // ROOT — first choice the user sees
    "root": {
      type: "choice",
      left: {
        image: "images/placeholder/placeholder-left.svg",
        alt: "A verdant field of common land",
        goTo: "branch-a"
      },
      right: {
        image: "images/placeholder/placeholder-right.svg",
        alt: "A city block under construction",
        goTo: "branch-b"
      }
    },

    // ── BRANCH A ────────────────────────────────────────────────────────────
    "branch-a": {
      type: "choice",
      left: {
        image: "images/placeholder/placeholder-left.svg",
        alt: "Hands holding soil",
        goTo: "branch-a-left"
      },
      right: {
        image: "images/placeholder/placeholder-right.svg",
        alt: "A deed of sale",
        goTo: "branch-a-right"
      }
    },

    "branch-a-left": {
      type: "choice",
      left: {
        image: "images/placeholder/placeholder-left.svg",
        alt: "Community garden",
        goTo: "deadend-reciprocity"
      },
      right: {
        image: "images/placeholder/placeholder-right.svg",
        alt: "Eviction notice",
        goTo: "deadend-displacement"
      }
    },

    "branch-a-right": {
      type: "deadend",
      text: `Who signed? Who was absent from the table?<br><br>
      <em>Land is relation.</em>`
    },

    // ── BRANCH B ────────────────────────────────────────────────────────────
    "branch-b": {
      type: "choice",
      left: {
        image: "images/placeholder/placeholder-left.svg",
        alt: "A displaced family",
        goTo: "branch-b-left"
      },
      right: {
        image: "images/placeholder/placeholder-right.svg",
        alt: "A luxury development sign",
        goTo: "branch-b-right"
      }
    },

    "branch-b-left": {
      type: "choice",
      left: {
        image: "images/placeholder/placeholder-left.svg",
        alt: "Protest march",
        goTo: "deadend-resistance"
      },
      right: {
        image: "images/placeholder/placeholder-right.svg",
        alt: "Empty lot",
        goTo: "deadend-erasure"
      }
    },

    "branch-b-right": {
      type: "deadend",
      text: `"Revitalization." "Investment." "Opportunity."<br><br>
      The language of capital obscures what it devours.<br><br>
      Who lived here before the scaffolding?<br>
      <em>Their names are still in the soil.</em>`
    },

    // ── DEAD ENDS ────────────────────────────────────────────────────────────

    "deadend-reciprocity": {
      type: "deadend",
      text: `This is what Black to the Land knows. What Indigenous land stewards have always known.<br><br>
      Land is a relationship to be tended.<br><br>
      <em>You have reached a threshold. Rest here a moment before you return.</em>`
    },

    "deadend-displacement": {
      type: "deadend",
      text: `Gentrification does not happen by accident. <br><br>
      It is the deliberate accumulation of land by capital, at the expense of BIPOC communities 
      who built the very neighborhoods now being sold back to them at impossible prices.<br><br>
      <em>This is a dead end — but it is not the end of the story.</em>`
    },

    "deadend-resistance": {
      type: "deadend",
      text: `Resistance has always been here.</em>`
    },

    "deadend-erasure": {
      type: "deadend",
      text: `We are here. We have always been here.</em>`
    }

  }
};
