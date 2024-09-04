import requests
from xml.dom.minidom import parseString

# URL e cabeçalhos para a requisição SOAP
API_URL = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso"
HEADERS = {'Content-Type': 'text/xml; charset=utf-8'}

def enviar_requisicao_soap(acao, parametro, valor):
    # Monta a carga SOAP para a requisição
    soap_envelope = f"""
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <{acao} xmlns="http://www.oorsprong.org/websamples.countryinfo">
                <{parametro}>{valor}</{parametro}>
            </{acao}>
        </soap:Body>
    </soap:Envelope>
    """

    # Realiza a requisição SOAP
    response = requests.post(API_URL, headers=HEADERS, data=soap_envelope)
    # Extração do resultado da resposta SOAP
    resultado = parseString(response.text).getElementsByTagName(f"m:{acao}Result")[0].firstChild.nodeValue
    return resultado

def obter_capital_nova_zelandia():
    """Obtém a capital da Nova Zelândia."""
    return enviar_requisicao_soap("CapitalCity", "sCountryISOCode", "NZ")

def executar_menu():
    """Executa o menu interativo para o usuário."""
    while True:
        print("\n" + "=" * 10 + " API SOAP - COUNTRIES " + "=" * 10)
        print("1. Qual a Capital da Nova Zelândia?")
        print("2. Código ISO do país")
        print("3. Código ISO da idioma")
        print("4. Nome do país")
        print("0. Encerrar")

        opcao = input("\nEscolha uma opção: ")

        if opcao == "0":
            break
        elif opcao == "1":
            print("\nCapital da Nova Zelândia: ", obter_capital_nova_zelandia())
        elif opcao == "2":
            pais = input("Digite o nome de um país (em inglês): ")
            iso_pais = enviar_requisicao_soap("CountryISOCode", "sCountryName", pais)
            print(f"Código ISO de {pais}: {iso_pais}")
        elif opcao == "3":
            idioma = input("Digite o nome de um idioma (em inglês): ")
            iso_idioma = enviar_requisicao_soap("LanguageISOCode", "sLanguageName", idioma)
            print(f"Código ISO de {idioma}: {iso_idioma}")
        elif opcao == "4":
            codigo_iso = input("Digite o código ISO do país: ")
            nome_pais = enviar_requisicao_soap("CountryName", "sCountryISOCode", codigo_iso)
            print(f"Nome do país para o código ISO {codigo_iso}: {nome_pais}")
        else:
            print("Opção inválida. Tente novamente.")

# Executa o programa
executar_menu()
