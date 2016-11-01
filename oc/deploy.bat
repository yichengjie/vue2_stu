@echo off
set build=b
set deploy=d
if "%1" == "%build%" (
	del dist\*.*  /q
	rd dist\images  /s /q
	rd dist\file  /s /q
	webpack --config webpack.config.js --progress --profile --colors
) else if "%1" == "%deploy%" (
	rd ..\..\public\oc /s /q
	
	md ..\..\public\oc
	md ..\..\public\oc\images
	md ..\..\public\oc\file
	md ..\..\public\oc\dll

	xcopy dist\*.js ..\..\public\oc
	xcopy dist\*.css ..\..\public\oc
	xcopy dist\*.map ..\..\public\oc
	xcopy dist\images\*.* ..\..\public\oc\images
	xcopy dist\file\*.* ..\..\public\oc\file
	xcopy dist\dll\*.* ..\..\public\oc\dll
) else (
	echo error command: b d
)