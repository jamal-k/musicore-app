import spacy

nlp = spacy.load('en_core_web_sm')
doc = nlp(u"I Bring to ya'll this morning.. A Festival of Shawarma and more ● Shawarma ● Barbecue ● Asun ● Cocktail ● Music ● Comedy ● Games...and more Date: Feburary 14 Venue: Ado-Ekiti Environs Ticket: 1500 (Get 1 free Shawarma) #ShawarmaFest #EkitiTwitter https://t.co/JgRXPWjdS0")
for ent in doc.ents:
 print(f"Text: {ent.text}, Start Index: {ent.start_char}, End Index: {ent.end_char}, Entity Label: {ent.label_}")