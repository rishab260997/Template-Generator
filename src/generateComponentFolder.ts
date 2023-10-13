import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export default function generateComponentFolder() {
  // Define the names and content for your component and style files
  const componentContent = `
  import React from 'react';
  import {View} from 'react-native';
  import {styles} from './styles';

  const ComponentName = () => {
    return (
      <View style={styles.main}>

      </View>
    )
  }

  export default ComponentName;
  `;

  const styleContent = `
  import {StyleSheet} from "react-native";

  export const styles = StyleSheet.create({
    main: {},
  })
  `;

  const folderName: string =
    vscode.workspace
      .getConfiguration("template-generator")
      .get("componentFolderName") || "Components";
  const folderPath = path.join(
    vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "",
    folderName
  );

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Create the component and style files
  fs.writeFileSync(
    path.join(folderPath, "Component.tsx"),
    componentContent,
    "utf-8"
  );
  fs.writeFileSync(path.join(folderPath, "styles.tsx"), styleContent, "utf-8");
}
