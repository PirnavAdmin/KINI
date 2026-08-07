FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY Registerkini.csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish Registerkini.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

ENV ASPNETCORE_URLS=http://+:5000

COPY --from=build /app/publish .

EXPOSE 5000

ENTRYPOINT ["dotnet", "Registerkini.dll"]
