import zeep

# URLs WSDL para os serviços SOAP
WSDL_COUNTRIES = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL"
WSDL_NUMBER_TO_WORDS = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL"

# Criação dos clientes SOAP
countries_client = zeep.Client(wsdl=WSDL_COUNTRIES)
numbers_client = zeep.Client(wsdl=WSDL_NUMBER_TO_WORDS)

def obter_capital_noruega():
    codigo_pais = "NO"  # Código ISO da Noruega
    return countries_client.service.CapitalCity(sCountryISOCode=codigo_pais)

def numero_por_extenso(numero):
    return numbers_client.service.NumberToWords(ubiNum=numero)

def exibir_menu():
    while True:
        print("\n" + "=" * 10 + " ZEEP - SOAP CLIENT " + "=" * 10)
        print("1. Qual a Capital da Noruega?")
        print("2. Número por Extenso")
        print("0. Encerrar")
        opcao = input("\nEscolha uma opção: ")

        if opcao == "0":
            break
        elif opcao == "1":
            print("\n" + "=" * 10 + " NORUEGA " + "=" * 10)
            print(f"A capital da Noruega é {obter_capital_noruega()}")
        elif opcao == "2":
            try:
                numero = int(input("Digite um número: "))
                print("\n" + "=" * 10 + " NÚMERO POR EXTENSO " + "=" * 10)
                print(numero_por_extenso(numero))
            except ValueError:
                print("Por favor, digite um número válido.")
        else:
            print("Opção inválida. Tente novamente.")

exibir_menu()
