from xml.dom.minidom import parse

dom = parse("parsers/cardapio.xml")

biblioteca = dom.documentElement

pratos = biblioteca.getElementsByTagName('prato')

print("~-~-~-~-~-~- TABELA DE PRATOS ~-~-~-~-~-~-")
for prato in pratos:
    nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue
    id = prato.getAttribute('id')
    print(f"PRATO: {nome} --- {id}")

value = input("Selecione o prato que deseja ver: ")

def detalhes(prato):
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
    descricao = prato.getElementsByTagName("descricao")[0].firstChild.nodeValue
    ingredientes = prato.getElementsByTagName("ingrediente")
    preco = prato.getElementsByTagName("preco")[0].firstChild.nodeValue
    moeda = prato.getElementsByTagName("preco")[0].getAttribute("moeda")
    calorias = prato.getElementsByTagName("calorias")[0].firstChild.nodeValue
    tempo_preparo = prato.getElementsByTagName("tempoPreparo")[0].firstChild.nodeValue

    print(f"\nNome: {nome}")
    print(f"Descrição: {descricao}")
    print("Ingredientes:")

    for ingrediente in ingredientes:
        print(f" - {ingrediente.firstChild.nodeValue}")
        
    print(f"Preço: {preco} {moeda}")
    print(f"Calorias: {calorias}")
    print(f"Tempo de Preparo: {tempo_preparo}")

prato_encontrado = None
for prato in pratos:
    if prato.getAttribute('id') == value:
        prato_encontrado = prato
        break

if prato_encontrado:
    detalhes(prato_encontrado)
else:
    print("Prato não encontrado!")

