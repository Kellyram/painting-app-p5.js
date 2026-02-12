Paint App – A Feature‑Rich Drawing Tool Built with p5.js 

Paint App is a browser‑based drawing application that delivers a smooth, intuitive painting experience. It combines a classic canvas‑drawn toolbar with modern DOM controls, all organised through clean object‑oriented design. The app supports real‑time brush and eraser tools, live background color switching that preserves existing artwork, and a full undo/redo system – all packed into under 400 lines of maintainable, test‑driven code.

✨ Key Features
Two drawing tools: Brush (custom color) and Eraser (automatically matches current background)
Color controls: Three preset swatches (black, red, blue) with active color highlighting (yellow outline)
Brush size: Adjustable via + / – buttons (2–50px)
modern DOM controls:
Brush color picker
Background color picker – instantly changes canvas without erasing your drawing
clear canvas button
Undo (↩) / Redo (↪) buttons

  Keyboard shortcuts:
Space – clear canvas
S – save drawing as PNG
T – toggle test mode (runs 6/6 passing unit tests)
Stroke persistence: All drawings are stored and can be redrawn on a new background – your artwork never disappears unless you clear it.

🧱 Architecture Highlights

Fully object‑oriented: Button, ToolSettings, Tool, BrushTool, EraserTool, PaintApp
Inheritance: EraserTool extends BrushTool and overrides onDrag to draw the current background color.
Composition: Tools receive settings and renderer objects; the renderer can be swapped (K5Renderer for production, FakeRenderer for testing).
Encapsulation: Brush size is clamped (2–50) via a setter; color is stored privately and exposed via getters.
Polymorphism: The app calls the same onPress / onDrag / onRelease interface on any tool – adding a new tool requires zero changes to the drawing loop.
Test harness: A lightweight DIY describe / it / expect system tests Button, ToolSettings, and BrushTool (using FakeRenderer injection). All 6 tests pass.

🖱️ User Instructions (also available in‑app)

Brush / Eraser – click the canvas‑drawn buttons at the top left
Color swatches – black, red, blue (active swatch glows yellow)
Size – use the – and + buttons next to the swatches
Color picker – choose any brush color from the DOM picker (top right)
Background picker – change canvas background; your drawing stays on top
Clear – wipes all strokes and resets undo/redo stacks
Undo / Redo – small ↩ and ↪ buttons below Clear
Keyboard: Space = clear, S = save PNG, T = run tests

