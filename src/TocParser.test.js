import TocParser from './TocParser'

const testInput1 = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN"
 "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
	<head>
		<meta content="urn:uuid:6281C300-E52E-464B-9047-CA91CABFFD84" name="dtb:uid"/>
		<meta content="2" name="dtb:depth"/>
		<meta content="0" name="dtb:totalPageCount"/>
		<meta content="0" name="dtb:maxPageNumber"/>
	</head>
	<docTitle>
		<text>Mitä tilinpäätös kertoo?</text>
	</docTitle>
	<docAuthor>
		<text>Ilari Salmi</text>
	</docAuthor>
	<navMap>
		<navPoint id="navpoint1" playOrder="1">
			<navLabel>
				<text>Nimiö</text>
			</navLabel>
			<content src="Text/TAMANNNNX-1.xhtml#toc_marker-1"/>
		</navPoint>
		<navPoint id="navpoint2" playOrder="2">
			<navLabel>
				<text>Copysivu</text>
			</navLabel>
			<content src="Text/TAMANNNNX-2.xhtml#toc_marker-2"/>
		</navPoint>
		<navPoint id="navpoint3" playOrder="3">
			<navLabel>
				<text>Sisällys</text>
			</navLabel>
			<content src="Text/TAMANNNNX-3.xhtml#toc_marker-3"/>
		</navPoint>
		<navPoint id="navpoint4" playOrder="4">
			<navLabel>
				<text>Esipuhe 8. painokseen</text>
			</navLabel>
			<content src="Text/TAMANNNNX-4.xhtml#toc_marker-4"/>
		</navPoint>
		<navPoint id="navpoint5" playOrder="5">
			<navLabel>
				<text>OSA I </text>
			</navLabel>
			<content src="Text/TAMANNNNX-5.xhtml#toc_marker-5"/>
			<navPoint id="navpoint6" playOrder="6">
				<navLabel>
					<text>YRITYKSEN TOIMINTA JA TALOUS</text>
				</navLabel>
				<content src="Text/TAMANNNNX-5.xhtml#toc_marker-5-1"/>
			</navPoint>
		</navPoint>
		<navPoint id="navpoint7" playOrder="7">
			<navLabel>
				<text>Yrityksen toiminta ja talous</text>
			</navLabel>
			<content src="Text/TAMANNNNX-6.xhtml#toc_marker-6"/>
		</navPoint>
		<navPoint id="navpoint8" playOrder="8">
			<navLabel>
				<text>1 Miten yritys toimii?</text>
			</navLabel>
			<content src="Text/TAMANNNNX-7.xhtml#toc_marker-7"/>
		</navPoint>
		<navPoint id="navpoint9" playOrder="9">
			<navLabel>
				<text>2 Tilinpäätöksen sisältö</text>
			</navLabel>
			<content src="Text/TAMANNNNX-8.xhtml#toc_marker-8"/>
		</navPoint>
		<navPoint id="navpoint10" playOrder="10">
			<navLabel>
				<text>3 Kansainvälinen tilinpäätöskäytäntö </text>
			</navLabel>
			<content src="Text/TAMANNNNX-9.xhtml#toc_marker-9"/>
		</navPoint>
		<navPoint id="navpoint11" playOrder="11">
			<navLabel>
				<text>OSA II</text>
			</navLabel>
			<content src="Text/TAMANNNNX-10.xhtml#toc_marker-10"/>
			<navPoint id="navpoint12" playOrder="12">
				<navLabel>
					<text>YRITYKSEN TALOUDEN HALTUUNOTTO</text>
				</navLabel>
				<content src="Text/TAMANNNNX-10.xhtml#toc_marker-10-1"/>
			</navPoint>
		</navPoint>
		<navPoint id="navpoint13" playOrder="13">
			<navLabel>
				<text>4 Tilinpäätöksen lukeminen ja tulkinta</text>
			</navLabel>
			<content src="Text/TAMANNNNX-11.xhtml#toc_marker-11"/>
		</navPoint>
		<navPoint id="navpoint14" playOrder="14">
			<navLabel>
				<text>5 Tilinpäätöksen standardointi eli oikaisu </text>
			</navLabel>
			<content src="Text/TAMANNNNX-12.xhtml#toc_marker-12"/>
		</navPoint>
		<navPoint id="navpoint15" playOrder="15">
			<navLabel>
				<text>6 Talouden pääkysymykset</text>
			</navLabel>
			<content src="Text/TAMANNNNX-13.xhtml#toc_marker-13"/>
		</navPoint>
		<navPoint id="navpoint16" playOrder="16">
			<navLabel>
				<text>7 Rahavirrat ja niiden riittävyys</text>
			</navLabel>
			<content src="Text/TAMANNNNX-14.xhtml#toc_marker-14"/>
		</navPoint>
		<navPoint id="navpoint17" playOrder="17">
			<navLabel>
				<text>OSA III</text>
			</navLabel>
			<content src="Text/TAMANNNNX-15.xhtml#toc_marker-15"/>
			<navPoint id="navpoint18" playOrder="18">
				<navLabel>
					<text>TILINPÄÄTÖKSEN HYVÄKSIKÄYTTÖ</text>
				</navLabel>
				<content src="Text/TAMANNNNX-15.xhtml#toc_marker-15-1"/>
			</navPoint>
		</navPoint>
		<navPoint id="navpoint19" playOrder="19">
			<navLabel>
				<text>8 Tilinpäätöksen hyväksikäyttö</text>
			</navLabel>
			<content src="Text/TAMANNNNX-16.xhtml#toc_marker-16"/>
		</navPoint>
		<navPoint id="navpoint20" playOrder="20">
			<navLabel>
				<text>9 Markkinaperusteinen tilinpäätösanalyysi</text>
			</navLabel>
			<content src="Text/TAMANNNNX-17.xhtml#toc_marker-17"/>
		</navPoint>
		<navPoint id="navpoint21" playOrder="21">
			<navLabel>
				<text>10 Yrityksen talouden haltuunotto: yhteenveto</text>
			</navLabel>
			<content src="Text/TAMANNNNX-18.xhtml#toc_marker-18"/>
		</navPoint>
		<navPoint id="navpoint22" playOrder="22">
			<navLabel>
				<text>Lähdekirjallisuutta</text>
			</navLabel>
			<content src="Text/TAMANNNNX-19.xhtml#toc_marker-19"/>
		</navPoint>
	</navMap>
</ncx>`

function test() {
    const parser = new TocParser()
    parser.parse(testInput1).then(toc => {
        
    })
}