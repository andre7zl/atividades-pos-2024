from xml.dom.minidom import parse
import json

dom_tree = parse("xml/imobiliaria.xml")
root = dom_tree.documentElement
imovel_nodes = root.getElementsByTagName("imovel")

imobiliaria_data = {"imobiliaria": {"imovel": []}}

for imovel_node in imovel_nodes:
    descricao_texto = imovel_node.getElementsByTagName("descricao")[0].childNodes[0].nodeValue
    
    proprietario_nome = imovel_node.getElementsByTagName("nome")[0].childNodes[0].nodeValue
    telefone_nodes = imovel_node.getElementsByTagName("telefone")
    telefone_lista = [tel.childNodes[0].nodeValue for tel in telefone_nodes]
    
    email_nodes = imovel_node.getElementsByTagName("email")
    email_lista = [email.childNodes[0].nodeValue for email in email_nodes]

    endereco_dados = {
        "rua": imovel_node.getElementsByTagName("rua")[0].childNodes[0].nodeValue,
        "bairro": imovel_node.getElementsByTagName("bairro")[0].childNodes[0].nodeValue,
        "cidade": imovel_node.getElementsByTagName("cidade")[0].childNodes[0].nodeValue,
        "numero": imovel_node.getElementsByTagName("numero")[0].childNodes[0].nodeValue
    }
    
    caracteristicas_dados = {
        "tamanho": imovel_node.getElementsByTagName("tamanho")[0].childNodes[0].nodeValue,
        "numQuartos": imovel_node.getElementsByTagName("numQuartos")[0].childNodes[0].nodeValue,
        "numBanheiros": imovel_node.getElementsByTagName("numBanheiros")[0].childNodes[0].nodeValue
    }
    
    valor_texto = imovel_node.getElementsByTagName("valor")[0].childNodes[0].nodeValue

    imobiliaria_data["imobiliaria"]["imovel"].append({
        "descricao": descricao_texto,
        "proprietario": {
            "nome": proprietario_nome,
            "telefone": telefone_lista,
            "email": email_lista
        },
        "endereco": endereco_dados,
        "caracteristicas": caracteristicas_dados,
        "valor": valor_texto
    })

with open("parsers/imobiliaria.json", "w", encoding='utf-8') as arquivo_json:
    json.dump(imobiliaria_data, arquivo_json, ensure_ascii=False, indent=2)
