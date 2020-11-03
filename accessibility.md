See [this page](https://www.wuhcag.com/wcag-checklist/) for descriptions of each section (except the last one, colour part II) which is linked inline.
Answer each of the following entries by filling out the "Description" column with a sentence or 2 for each one:

Guideline | Summary | Description of how you accommodated this
--- | --- | ---
1.1.1 – Non-text Content | Provide text alternatives for non-text content | For the logos there is an alt tag, other than that there are not a lot of visuals except for the map of new leads where they can use the list instead. Also there are icons but they also have text beside them.
1.2.1 – Audio-only and Video-only (Pre-recorded) | Provide an alternative to video-only and audio-only content | No audio only or video only content.
1.2.2 – Captions (Pre-recorded) | Provide captions for videos with audio | No audio content.
1.2.3 – Audio Description or Media Alternative (Pre-recorded) | Video with audio has a second alternative | No audio content.
1.3.1 – Info and Relationships | Logical structure | There are headings throughout the site to break up the content. On top of visualizations, tables and pages. Also content has been split up into pages.
1.3.2 – Meaningful Sequence | Present content in a meaningful order | We tried to display things in a meaningful sequence. The dashboard view is pretty standard on dashboard, with metrics summarizing the content on top, then visualization placed from most important to least important top to bottom (e.g map first then charts later). There is also a separate navigation view. 
1.3.3 – Sensory Characteristics | Use more than one sense for instructions | No audio. There are some buttons and metric cards which have a icon + text for two senses (e.g save and add). Also there are placeholders for text. This could have been done better with more instructions.
1.4.1 – Use of Colour | Don’t use presentation that relies solely on colour | No presentation that relies soley on color, can hover over charts for more information.
1.4.2 – Audio Control | Don’t play audio automatically | No Audio.
2.1.1 – Keyboard | Accessible by keyboard only | The forms are able to be tabbed through. Unfortunately we could not make the navigation, keyboard only at this time.
2.1.2 – No Keyboard Trap | Don’t trap keyboard users | The forms are able to be tabbed through. Unfortunately we could not make the navigation, keyboard only at this time.
2.2.1 – Timing Adjustable | Time limits have user controls | No time limit.
2.2.2 – Pause, Stop, Hide | Provide user controls for moving content | No moving content.
2.3.1 – Three Flashes or Below | No content flashes more than three times per second | No content flashes.
2.4.1 – Bypass Blocks | Provide a ‘Skip to Content’ link | No blocks. 
2.4.2 – Page Titled | Use helpful and clear page titles | All pages are titled with that they represent.
2.4.3 – Focus Order | Logical order | Believe there is a logical order (dashboard and lead details ordered by meaningful sequence). Profile at the top right with an email and profile icon. Navigation on the left. 
2.4.4 – Link Purpose (In Context) | Every link’s purpose is clear from its context | Not many links as there are buttons. Button indicates that there will be an action. Email at the top right with a user icon shows that clicking on it will go to somewhere related to profile changes. Each lead title is clickable which indicates clicking on it will go to more "details.""
3.1.1 – Language of Page | Page has a language assigned | <html ="en" ...> used. 
3.2.1 – On Focus | Elements do not change when they receive focus | No change in elements when they are focused. 
3.2.2 – On Input | Elements do not change when they receive input | No change in elements when input is received. A button must be clicked for a change to go through. One maybe exception to this is clicking on "Successful" in the change status select opens a modal, however the change doesn't automatically happen. 
3.3.1 – Error Identification | Clearly identify input errors | Forms for the most part indicate what type of input to receive. There are textboxes for text, password boxes (so hidden value) for passwords. Select for categorical options. Number boxes for number value (e.g revenue.) And a timepicker. However, if an input is wrong we do not neccessairly check it at this time and this could be improved.  
3.3.2 – Labels or Instructions | Label elements and give instructions | Forms all have labels and placeholders indicate what type of input is required. 
4.1.1 – Parsing | No major code errors | Tags are closed. There are some ids used when required. Also using react which uses linting and indicates if there are major code errors. Since it is able to compile and run there should be no major ones. 
4.1.2 – Name, Role, Value | Build all elements for accessibility | Using the validator.w3.org tool shows there are no major errors (https://validator.w3.org/nu/?doc=https%3A%2F%2Fmusicore.herokuapp.com). Third party code is used (libraries). Names and labels are used as stated above. 
Colour Part II | [Colours are chosen in a way that won't make things difficult for colour blind users](https://venngage.com/blog/color-blind-friendly-palette/) |  While red and green are used on the confidence score for example, since there is also text beside them (High and Low) the color is not as important. If there is difficulty seeing the colors in the charts they can be hovered upon to see the value it represents. Only mostly purple is used as branding and most text is black/grey on top of white. 