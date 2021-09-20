# Setup

```
npm i
npm run build:all
Press F5 to launch VSCode extension editor
```

Create a new file or open a file with this content:
```
<Page>
  <PageSection>
    <Button>
      Button within a section
    </Button>     
  </PageSection>  
</Page>
```
Open the command palette (SHIFT+CMD+P) and look for `UI Builder` and hit enter.
A new side view should pop up. It might be necessary to expand the width of the side view to show the elements properly (due to the code still being WIP).


If you make changes under src/builder run `npm run build:ui`

If you make any other changes under src run `npm run build:vs`
