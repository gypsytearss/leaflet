from bs4 import BeautifulSoup
import urllib2

page = urllib2.urlopen("http://en.wikipedia.org/wiki/List_of_cities_by_latitude")
text = page.read()
soup = BeautifulSoup(text)
tables = soup.find_all('table', class_='wikitable')

for table in tables:
	rowsoup = table.find_all('tr')
	for row in rowsoup:
		data = row.find_all('td')
		for dat in data:
			print repr(dat.stripped_strings)