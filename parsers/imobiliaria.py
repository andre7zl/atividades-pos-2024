from xml.dom.minidom import parse

# Parse do arquivo XML
dom = parse("xml/imobiliaria.xml")

# Raiz do documento
imobiliaria = dom.documentElement

# Obtendo todos os imóveis
imoveis = imobiliaria.getElementsByTagName('imovel')

print("~-~-~-~-~-~- TABELA DE IMÓVEIS ~-~-~-~-~-~-")
for imovel in imoveis:
    descricao = imovel.getElementsByTagName('descricao')[0].firstChild.nodeValue
    id = imovel.getAttribute('id')
    print(f"IMÓVEL: {descricao} --- {id}")

