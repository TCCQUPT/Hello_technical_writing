const fs = require('fs');
const path = require('path');
const marked = require('marked');

const tcerDir = 'TCer';
const cards = [];

console.log(`Reading files from directory: ${tcerDir}`);
const files = fs.readdirSync(tcerDir);
console.log(`Found files: ${files.join(', ')}`);

files.forEach(file => {
  if (file.endsWith('.md')) {
    console.log(`Processing file: ${file}`);
    try { 
      const filePath = path.join(tcerDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      console.log(`Read content from ${file}`);
      const html = marked.parse(content);
      console.log(`Parsed Markdown for ${file}`);
      
      // 使用更安全的匹配和默认值
      const nameMatch = html.match(/<h1>(.*?)<\/h1>/);
      const schoolMatch = html.match(/<h2>(.*?)<\/h2>/);
      const sloganMatch = html.match(/<h3>(.*?)<\/h3>/);

      const name = nameMatch ? nameMatch[1].trim() : 'N/A'; 
      const school = schoolMatch ? schoolMatch[1].trim() : 'N/A';
      const slogan = sloganMatch ? sloganMatch[1].trim() : 'N/A';
      
      console.log(`Extracted data for ${file}: Name=${name}, School=${school}, Slogan=${slogan}`);
      cards.push({name, school, slogan});

    } catch (error) {
      console.error(`Error processing file ${file}: ${error.message}`); 
      // 打印更详细的错误信息
    }
  } else {
    console.log(`Skipping non-markdown file: ${file}`);
  }
});

console.log(`Total cards generated: ${cards.length}`);
const scriptPath = 'script.js'; 

if (fs.existsSync(scriptPath)) { 
    console.log(`Reading existing script file: ${scriptPath}`);
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // 正则表达式查找 const cardsData = [...] 或 const exampleData = [...]
    const regex = /(const\s+(?:cardsData|exampleData)\s*=\s*)\[.*?\]\s*;?/;
    
    if (regex.test(scriptContent)) {
        const newScript = scriptContent.replace(
          regex, 
          `$1${JSON.stringify(cards, null, 2)};` // 格式化 JSON 输出
        );
        
        if (newScript !== scriptContent) { 
            fs.writeFileSync(scriptPath, newScript);
            console.log(`Successfully updated ${scriptPath} with ${cards.length} cards.`);
        } else {
            console.log(`${scriptPath} content already up-to-date. No changes written.`);
        }
    } else {
        console.error(`Could not find target variable (cardsData or exampleData) in ${scriptPath}. Cannot update.`);
        process.exit(1); // 变量未找到，Action 失败
    }
} else {
    console.error(`${scriptPath} not found. Cannot update cards data.`);
    process.exit(1); // script.js 不存在，Action 失败
} 